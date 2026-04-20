import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { sendOrderStatusUpdateEmail } from '@/lib/email';
import { OrderStatus } from '@prisma/client';
import { translations } from '@/lib/i18n';

function pickLang(req: NextRequest): 'zh' | 'en' {
  const al = req.headers.get('accept-language') ?? '';
  return al.toLowerCase().startsWith('en') ? 'en' : 'zh';
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = session.user.role === 'ADMIN';
    const { status } = await req.json();
    const lang = pickLang(req);
    const t = translations[lang];

    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // CUSTOMER can only set status to CANCELLED
    if (!isAdmin && status !== 'CANCELLED') {
      return NextResponse.json({ error: t.cancelForbidden }, { status: 403 });
    }

    const { id } = await params;

    // For CANCELLED transitions, use a transaction to restore stock atomically
    if (status === 'CANCELLED') {
      const updatedOrder = await prisma.$transaction(async (tx) => {
        const existing = await tx.order.findUnique({
          where: { id },
          include: {
            items: { select: { productId: true, quantity: true } },
            user: { select: { id: true, email: true } },
          },
        });

        if (!existing) {
          return null;
        }

        // CUSTOMER can only cancel their own orders
        if (!isAdmin && existing.user.id !== session.user.id) {
          throw Object.assign(new Error(t.cancelForbidden), { statusCode: 403 });
        }

        // Only PENDING orders can be cancelled
        if (existing.status !== 'PENDING') {
          throw Object.assign(new Error(t.cancelNotPending), { statusCode: 409 });
        }

        // Restore stock for each item
        for (const item of existing.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }

        return tx.order.update({
          where: { id },
          data: { status: 'CANCELLED' },
          include: { user: { select: { email: true } } },
        });
      });

      if (!updatedOrder) {
        return NextResponse.json({ error: t.orderNotFound }, { status: 404 });
      }

      try {
        await sendOrderStatusUpdateEmail(
          updatedOrder.user.email,
          updatedOrder.orderNumber,
          'CANCELLED'
        );
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }

      return NextResponse.json(updatedOrder);
    }

    // Non-CANCELLED status changes (ADMIN only path)
    if (!isAdmin) {
      return NextResponse.json({ error: t.cancelForbidden }, { status: 403 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: { select: { email: true } },
      },
    });

    // Send status update email after successful DB update
    try {
      await sendOrderStatusUpdateEmail(
        order.user.email,
        order.orderNumber,
        status
      );
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = (error as Error & { statusCode: number }).statusCode;
      return NextResponse.json({ error: error.message }, { status: statusCode });
    }
    console.error('Update order status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

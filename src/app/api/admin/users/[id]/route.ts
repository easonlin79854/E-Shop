import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
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

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { role, name } = body;

    if (role === undefined && name === undefined) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const updateData: { role?: 'ADMIN' | 'CUSTOMER'; name?: string } = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (role !== undefined) {
      if (role !== 'ADMIN' && role !== 'CUSTOMER') {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }

      // Guard: prevent demoting the last admin
      if (role === 'CUSTOMER') {
        const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
        const targetUser = await prisma.user.findUnique({ where: { id }, select: { role: true } });

        if (targetUser?.role === 'ADMIN' && adminCount <= 1) {
          const lang = pickLang(req);
          const message = translations[lang].lastAdminError;
          return NextResponse.json({ error: message }, { status: 409 });
        }
      }

      updateData.role = role;
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const lang = pickLang(req);
    const t = translations[lang];

    // Guard: cannot delete yourself
    if (session.user.id === id) {
      return NextResponse.json({ error: t.cannotDeleteSelf }, { status: 403 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: t.userNotFound }, { status: 404 });
    }

    // Guard: cannot delete the last admin
    if (targetUser.role === 'ADMIN') {
      const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
      if (adminCount <= 1) {
        return NextResponse.json({ error: t.cannotDeleteLastAdmin }, { status: 409 });
      }
    }

    // Cascade delete: OrderItem -> Order -> User (Account/Session cascade via schema)
    await prisma.$transaction(async (tx) => {
      const orders = await tx.order.findMany({
        where: { userId: id },
        select: { id: true },
      });
      const orderIds = orders.map((o) => o.id);

      if (orderIds.length > 0) {
        await tx.orderItem.deleteMany({ where: { orderId: { in: orderIds } } });
        await tx.order.deleteMany({ where: { userId: id } });
      }

      await tx.user.delete({ where: { id } });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

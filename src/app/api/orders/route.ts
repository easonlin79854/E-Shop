import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateOrderNumber } from '@/lib/order-number';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function GET(_req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, note: rawNote } = await req.json();

    const trimmedNote = typeof rawNote === 'string' ? rawNote.trim() : '';
    if (trimmedNote.length > 100) {
      return NextResponse.json(
        { error: 'Note cannot exceed 100 characters' },
        { status: 400 }
      );
    }
    const note = trimmedNote.length > 0 ? trimmedNote : null;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must have at least one item' },
        { status: 400 }
      );
    }

    // Validate products and calculate total
    let totalAmount = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || !product.isActive) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found or inactive` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${product.name}` },
          { status: 400 }
        );
      }

      const itemPrice = Number(product.price);
      totalAmount += itemPrice * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    const orderNumber = await generateOrderNumber();

    const order = await prisma.$transaction(async (tx) => {
      // Decrement stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return tx.order.create({
        data: {
          orderNumber,
          userId: session.user.id,
          totalAmount,
          note,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: { include: { product: true } },
          user: true,
        },
      });
    });

    // Send confirmation email after successful transaction
    try {
      await sendOrderConfirmationEmail(
        order.user.email,
        order.orderNumber,
        `$${totalAmount.toFixed(2)}`
      );
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

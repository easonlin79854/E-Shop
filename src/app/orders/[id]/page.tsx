import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { OrderDetailClient } from '@/components/OrderDetailClient';

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      user: { select: { email: true, name: true } },
    },
  });

  if (!order) {
    notFound();
  }

  if (session.user.role !== 'ADMIN' && order.userId !== session.user.id) {
    notFound();
  }

  const serialized = {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    totalAmount: Number(order.totalAmount),
    createdAt: order.createdAt.toISOString(),
    note: order.note ?? null,
    items: order.items.map((item) => ({
      id: item.id,
      price: Number(item.price),
      quantity: item.quantity,
      product: { name: item.product.name },
    })),
  };

  return <OrderDetailClient order={serialized} />;
}

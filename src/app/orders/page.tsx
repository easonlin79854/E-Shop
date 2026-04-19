import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { OrdersPageClient } from '@/components/OrdersPageClient';

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  const serialized = orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    status: o.status,
    totalAmount: Number(o.totalAmount),
    createdAt: o.createdAt.toISOString(),
    items: o.items.map((i) => ({ id: i.id, quantity: i.quantity })),
  }));

  return <OrdersPageClient orders={serialized} />;
}

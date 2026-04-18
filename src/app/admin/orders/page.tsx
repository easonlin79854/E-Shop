import { prisma } from '@/lib/prisma';
import { AdminOrdersClient } from '@/components/AdminOrdersClient';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { email: true, name: true } },
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return <AdminOrdersClient orders={orders} />;
}

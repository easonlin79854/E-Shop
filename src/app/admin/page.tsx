import { prisma } from '@/lib/prisma';
import { AdminDashboardClient } from '@/components/AdminDashboardClient';

export default async function AdminDashboard() {
  const [productCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (
    <AdminDashboardClient
      productCount={productCount}
      orderCount={orderCount}
      userCount={userCount}
    />
  );
}

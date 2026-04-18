import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const [productCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500 text-sm">Total Products</h2>
          <p className="text-3xl font-bold mt-1">{productCount}</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-3xl font-bold mt-1">{orderCount}</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-3xl font-bold mt-1">{userCount}</p>
        </div>
      </div>
    </div>
  );
}

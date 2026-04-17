import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
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

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order {order.orderNumber}</h1>
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'COMPLETED'
                ? 'bg-green-100 text-green-800'
                : order.status === 'CANCELLED'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Order Date</span>
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-bold text-xl">
            ${Number(order.totalAmount).toFixed(2)}
          </span>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Items</h2>
      <div className="space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                ${Number(item.price).toFixed(2)} × {item.quantity}
              </p>
            </div>
            <span className="font-semibold">
              ${(Number(item.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

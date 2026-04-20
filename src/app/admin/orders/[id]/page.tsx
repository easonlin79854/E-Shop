import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { OrderStatusForm } from '@/components/OrderStatusForm';

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { email: true, name: true } },
      items: { include: { product: true } },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order {order.orderNumber}</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Customer</h2>
          <p className="text-gray-600">{order.user.name || 'N/A'}</p>
          <p className="text-gray-600">{order.user.email}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Order Info</h2>
          <p className="text-gray-600">
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            Total: ${Number(order.totalAmount).toFixed(2)}
          </p>
          {order.note && (
            <p className="text-gray-600 mt-2">
              Note: {order.note}
            </p>
          )}
        </div>
      </div>
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-3">Update Status</h2>
        <OrderStatusForm orderId={order.id} currentStatus={order.status} />
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

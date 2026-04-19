'use client';

import Link from 'next/link';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';

interface OrderItem {
  id: string;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export function OrdersPageClient({ orders }: { orders: Order[] }) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t.myOrders}</h1>
      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">{t.noOrdersYet}</p>
          <Link href="/products" className="text-primary-600 hover:underline">
            {t.browseProducts}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{order.orderNumber}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      order.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'CANCELLED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status === 'COMPLETED'
                      ? t.statusCompleted
                      : order.status === 'CANCELLED'
                      ? t.statusCancelled
                      : t.statusPending}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    {order.items.length} {t.orderItems}
                  </span>
                  <span className="mx-2">•</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

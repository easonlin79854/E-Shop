'use client';

import Link from 'next/link';
import { useLang } from '@/components/AppProviders';
import { translations } from '@/lib/i18n';

interface Order {
  id: string;
  orderNumber: string;
  user: { email: string };
  totalAmount: unknown;
  status: string;
  createdAt: Date | string;
}

export function AdminOrdersClient({ orders }: { orders: Order[] }) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t.allOrders}</h1>
      <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colOrderNumber}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colCustomer}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colTotal}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colOrderStatus}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colDate}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-mono text-sm">{order.orderNumber}</td>
                <td className="px-4 py-3 text-sm">{order.user.email}</td>
                <td className="px-4 py-3">${Number(order.totalAmount).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      order.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : order.status === 'CANCELLED'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    {t.manageOrder}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

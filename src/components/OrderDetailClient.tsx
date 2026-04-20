'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';

interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  note: string | null;
  items: OrderItem[];
}

export function OrderDetailClient({ order }: { order: Order }) {
  const { lang } = useLang();
  const t = translations[lang];
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const statusLabel =
    order.status === 'COMPLETED'
      ? t.statusCompleted
      : order.status === 'CANCELLED'
      ? t.statusCancelled
      : t.statusPending;

  const handleCancel = async () => {
    if (!confirm(t.cancelOrderConfirm)) return;
    setCancelling(true);
    setMessage('');

    const res = await fetch(`/api/orders/${order.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'CANCELLED' }),
    });

    setCancelling(false);

    if (res.ok) {
      setMessage(t.cancelSuccess);
      setMessageType('success');
      router.refresh();
    } else {
      const data = await res.json();
      setMessage(data.error || 'Failed to cancel order');
      setMessageType('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {t.orderTitle} {order.orderNumber}
      </h1>
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 dark:text-gray-400">{t.statusLabel}</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'COMPLETED'
                ? 'bg-green-100 text-green-800'
                : order.status === 'CANCELLED'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {statusLabel}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 dark:text-gray-400">{t.orderDate}</span>
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">{t.totalLabel}</span>
          <span className="font-bold text-xl">
            ${Number(order.totalAmount).toFixed(2)}
          </span>
        </div>
        {order.note && (
          <div className="flex items-start justify-between mt-4 pt-4 border-t">
            <span className="text-gray-600 dark:text-gray-400">{t.noteLabel}</span>
            <span className="text-right max-w-xs">{order.note}</span>
          </div>
        )}
      </div>

      {order.status === 'PENDING' && (
        <div className="mb-6">
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {cancelling ? '...' : t.cancelOrderBtn}
          </button>
        </div>
      )}

      {message && (
        <div
          className={`mb-6 p-3 rounded-md text-sm ${
            messageType === 'success'
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}
        >
          {message}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">{t.orderItemsTitle}</h2>
      <div className="space-y-3">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
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


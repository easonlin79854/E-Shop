'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';
import { useCart } from '@/contexts/CartContext';
import { safeImageUrl } from '@/lib/safeImageUrl';

interface CartPageClientProps {
  isLoggedIn: boolean;
}

export function CartPageClient({ isLoggedIn }: CartPageClientProps) {
  const { lang } = useLang();
  const t = translations[lang];
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const [note, setNote] = useState('');
  const [noteError, setNoteError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNoteChange = (value: string) => {
    setNote(value);
    if (value.trim().length > 100) {
      setNoteError(t.noteTooLong);
    } else {
      setNoteError('');
    }
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      router.push('/login?callbackUrl=/cart');
      return;
    }

    if (note.trim().length > 100) {
      setNoteError(t.noteTooLong);
      return;
    }

    setLoading(true);
    setError('');

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        note: note || undefined,
      }),
    });

    setLoading(false);

    if (res.ok) {
      const order = await res.json();
      clearCart();
      router.push(`/orders/${order.id}`);
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to place order');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">{t.cart}</h1>
        <p className="text-gray-500 mb-6">{t.cartEmpty}</p>
        <Link
          href="/products"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
        >
          {t.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t.cart}</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 border rounded-lg p-4"
          >
            {/* Image */}
            {safeImageUrl(item.imageUrl) ? (
              <img
                src={safeImageUrl(item.imageUrl)!}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-400 text-xs">{t.noImage}</span>
              </div>
            )}

            {/* Name & price */}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-sm text-gray-500">
                {t.unitPrice}: ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-lg leading-none"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-lg leading-none"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <div className="w-20 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-red-500 hover:text-red-700 text-sm ml-2"
            >
              {t.cartRemove}
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t pt-4 mb-6">
        <span className="text-lg font-semibold">{t.cartTotal}</span>
        <span className="text-2xl font-bold text-primary-600">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Note (only for logged-in users) */}
      {isLoggedIn && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            {t.noteLabel}{' '}
            <span className="text-gray-400 font-normal">({t.noteOptional})</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder={t.notePlaceholder}
            maxLength={120}
            rows={3}
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex items-center justify-between mt-1">
            {noteError ? (
              <span className="text-red-600 text-xs">{noteError}</span>
            ) : (
              <span />
            )}
            <span className="text-xs text-gray-400">
              {note.trim().length}/100
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Link
          href="/products"
          className="px-6 py-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          {t.continueShopping}
        </Link>
        <button
          onClick={handleCheckout}
          disabled={loading || !!noteError}
          className="flex-1 bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 disabled:opacity-50 font-medium"
        >
          {loading
            ? t.placing
            : isLoggedIn
            ? t.placeOrder
            : t.loginToCheckout}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export function AddToCartForm({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ productId: product.id, quantity }],
      }),
    });

    setLoading(false);

    if (res.ok) {
      const order = await res.json();
      router.push(`/orders/${order.id}`);
    } else if (res.status === 401) {
      router.push('/login');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Failed to place order');
    }
  };

  return (
    <div className="space-y-4">
      {message && (
        <div className="text-red-600 text-sm">{message}</div>
      )}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Quantity:</label>
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border border-gray-300 rounded-md px-3 py-1"
        />
      </div>
      <button
        onClick={handleOrder}
        disabled={loading || product.stock === 0}
        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Placing order...' : 'Buy Now'}
      </button>
    </div>
  );
}

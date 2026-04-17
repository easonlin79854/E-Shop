'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });

    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete product');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      Delete
    </button>
  );
}

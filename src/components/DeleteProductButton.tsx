'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { lang } = useLang();
  const t = translations[lang];

  const handleDelete = async () => {
    if (!confirm(t.deleteConfirm)) return;

    setLoading(true);
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || t.deleteProductReferenced);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      {t.deleteBtn}
    </button>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';

interface ProductData {
  id: string;
  name: string;
  description: string | null;
  price: unknown;
  imageUrl: string | null;
  stock: number;
  isActive: boolean;
}

export function ProductForm({ product }: { product: ProductData | null }) {
  const router = useRouter();
  const { lang } = useLang();
  const t = translations[lang];

  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(Number(product.price)) : '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? '');
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = product ? `/api/products/${product.id}` : '/api/products';
    const method = product ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description: description || null,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        stock,
        isActive,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save product');
    }
  };

  const inputClass =
    'w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500';

  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">{error}</div>
      )}
      <div>
        <label className={labelClass}>{t.formNameLabel}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t.formDescriptionLabel}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t.formPriceLabel}</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t.formImageUrlLabel}</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t.formStockLabel}</label>
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className={inputClass}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.formActiveLabel}
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? t.formSaving : t.formSave}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          {t.formCancel}
        </button>
      </div>
    </form>
  );
}

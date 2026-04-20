'use client';

import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';
import { AddToCartForm } from './AddToCartForm';
import { safeImageUrl } from '@/lib/safeImageUrl';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
}

export function ProductDetailClient({ product }: { product: Product }) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {safeImageUrl(product.imageUrl) ? (
            <img
              src={safeImageUrl(product.imageUrl)!}
              alt={product.name}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">{t.noImage}</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-3xl font-bold text-primary-600 mt-2">
            ${Number(product.price).toFixed(2)}
          </p>
          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {product.description}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {product.stock > 0
              ? `${product.stock} ${t.inStock}`
              : t.outOfStock}
          </p>
          <div className="mt-6">
            <AddToCartForm
              product={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                imageUrl: product.imageUrl,
                stock: product.stock,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

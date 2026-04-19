'use client';

import Link from 'next/link';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';
import { safeImageUrl } from '@/lib/safeImageUrl';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t.products}</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">{t.noProductsAvailable}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {safeImageUrl(product.imageUrl) ? (
                  <img
                    src={safeImageUrl(product.imageUrl)!}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400">{t.noImage}</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.stock > 0
                        ? `${product.stock} ${t.inStock}`
                        : t.outOfStock}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

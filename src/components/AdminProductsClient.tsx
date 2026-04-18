'use client';

import Link from 'next/link';
import { useLang } from '@/components/AppProviders';
import { translations } from '@/lib/i18n';
import { DeleteProductButton } from '@/components/DeleteProductButton';

interface Product {
  id: string;
  name: string;
  price: unknown;
  stock: number;
  isActive: boolean;
}

export function AdminProductsClient({ products }: { products: Product[] }) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t.productsTitle}</h1>
        <Link
          href="/admin/products/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          {t.addProduct}
        </Link>
      </div>
      <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colName}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colPrice}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colStock}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colStatus}</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">${Number(product.price).toFixed(2)}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {product.isActive ? t.statusActive : t.statusInactive}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      {t.editBtn}
                    </Link>
                    <DeleteProductButton id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

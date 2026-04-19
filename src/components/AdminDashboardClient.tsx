'use client';

import { useLang } from '@/components/AppProviders';
import { translations } from '@/lib/i18n';

interface Props {
  productCount: number;
  orderCount: number;
  userCount: number;
}

export function AdminDashboardClient({ productCount, orderCount, userCount }: Props) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t.dashboard}</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="border dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm">{t.totalProducts}</h2>
          <p className="text-3xl font-bold mt-1">{productCount}</p>
        </div>
        <div className="border dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm">{t.totalOrders}</h2>
          <p className="text-3xl font-bold mt-1">{orderCount}</p>
        </div>
        <div className="border dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm">{t.totalUsers}</h2>
          <p className="text-3xl font-bold mt-1">{userCount}</p>
        </div>
      </div>
    </div>
  );
}

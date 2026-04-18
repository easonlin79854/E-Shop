'use client';

import Link from 'next/link';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';

export function AdminSidebar() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <aside className="w-48 flex-shrink-0">
      <h2 className="font-bold text-lg mb-4">{t.adminPanel}</h2>
      <nav className="space-y-2">
        <Link href="/admin" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          {t.dashboard}
        </Link>
        <Link href="/admin/products" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          {t.adminProducts}
        </Link>
        <Link href="/admin/orders" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          {t.adminOrders}
        </Link>
        <Link href="/admin/users" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          {t.adminUsers}
        </Link>
      </nav>
    </aside>
  );
}

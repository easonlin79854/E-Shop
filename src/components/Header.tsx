'use client';

import Link from 'next/link';
import { SignOutButton } from './SignOutButton';
import { useLang, useTheme } from './AppProviders';
import { translations } from '@/lib/i18n';
import { useCart } from '@/contexts/CartContext';

interface SessionUser {
  email?: string | null;
  role?: string | null;
}

interface SessionData {
  user: SessionUser;
}

export function Header({ session }: { session: SessionData | null }) {
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const { totalCount } = useCart();
  const t = translations[lang];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-primary-600">
              {t.brand}
            </Link>
            <Link
              href="/products"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {t.products}
            </Link>
            {session && (
              <Link
                href="/orders"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {t.myOrders}
              </Link>
            )}
            {session?.user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {t.admin}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Cart icon */}
            <Link href="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-1" aria-label={t.cart}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </Link>

            {/* Language switcher */}
            <div className="flex items-center text-sm border dark:border-gray-600 rounded-md overflow-hidden">
              <button
                onClick={() => setLang('zh')}
                className={`px-2 py-1 ${
                  lang === 'zh'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {t.zhLabel}
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 ${
                  lang === 'en'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {t.enLabel}
              </button>
            </div>

            {/* Theme switcher */}
            <div className="flex items-center text-sm border dark:border-gray-600 rounded-md overflow-hidden">
              <button
                onClick={() => setTheme('light')}
                className={`px-2 py-1 ${
                  theme === 'light'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {t.lightLabel}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 py-1 ${
                  theme === 'dark'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {t.darkLabel}
              </button>
            </div>

            {/* Auth */}
            {session ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {session.user.email}
                  {session.user.role === 'ADMIN' && (
                    <span className="ml-1 text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </span>
                <SignOutButton label={t.signOut} />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {t.login}
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  {t.register}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

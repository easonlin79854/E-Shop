'use client';

import Link from 'next/link';
import { SignOutButton } from './SignOutButton';
import { useLang, useTheme } from './AppProviders';
import { translations } from '@/lib/i18n';

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

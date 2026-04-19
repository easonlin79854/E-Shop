'use client';

import Link from 'next/link';
import { useLang } from '@/components/AppProviders';
import { translations } from '@/lib/i18n';

interface HomeClientProps {
  isLoggedIn: boolean;
}

export function HomeClient({ isLoggedIn }: HomeClientProps) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 text-center overflow-hidden">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-primary-400/10 dark:bg-primary-400/5 blur-2xl" />
      </div>

      {/* Brand badge */}
      <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 tracking-wide">
        E-Shop
      </span>

      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
        {t.heroTitle}
      </h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
        {t.heroSubtitle}
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="
            inline-flex items-center gap-2
            bg-primary-500 hover:bg-primary-600 active:bg-primary-700
            text-white font-semibold
            px-8 py-3.5 rounded-xl text-lg
            shadow-lg shadow-primary-500/30
            transition-all duration-200
            hover:-translate-y-0.5 active:translate-y-0
          "
        >
          {t.browseProductsBtn}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {!isLoggedIn && (
          <Link
            href="/register"
            className="
              inline-flex items-center gap-2
              border-2 border-primary-500 text-primary-600 dark:text-primary-400
              hover:bg-primary-500 hover:text-white dark:hover:text-white
              active:bg-primary-600
              font-semibold
              px-8 py-3.5 rounded-xl text-lg
              transition-all duration-200
              hover:-translate-y-0.5 active:translate-y-0
            "
          >
            {t.getStartedBtn}
          </Link>
        )}
      </div>
    </div>
  );
}

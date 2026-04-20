'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type Lang } from '@/lib/i18n';
import { CartProvider } from '@/contexts/CartContext';

function setCookieLang(lang: Lang) {
  document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const LangContext = createContext<LangContextType>({
  lang: 'zh',
  setLang: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function useLang() {
  return useContext(LangContext);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    // Prefer localStorage, fall back to cookie, then default 'zh'
    const rawCookieLang = document.cookie
      .split('; ')
      .find((row) => row.startsWith('lang='))
      ?.split('=')[1];
    // Decode and only accept known valid values to prevent injection
    const decoded = rawCookieLang ? decodeURIComponent(rawCookieLang) : undefined;
    const cookieLang: Lang | undefined =
      decoded === 'en' || decoded === 'zh' ? decoded : undefined;
    const savedLang = (localStorage.getItem('lang') as Lang) || cookieLang || 'zh';
    setThemeState(savedTheme);
    setLangState(savedLang);
    setCookieLang(savedLang);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    setCookieLang(l);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LangContext.Provider value={{ lang, setLang }}>
        <CartProvider>
          {children}
        </CartProvider>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

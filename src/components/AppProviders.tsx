'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type Lang } from '@/lib/i18n';

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
    const savedLang = (localStorage.getItem('lang') as Lang) || 'zh';
    setThemeState(savedTheme);
    setLangState(savedLang);
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
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LangContext.Provider value={{ lang, setLang }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

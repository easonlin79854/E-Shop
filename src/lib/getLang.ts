import { cookies } from 'next/headers';
import { type Lang } from './i18n';

/**
 * Read the user's preferred language from the `lang` cookie.
 * Falls back to 'zh' if the cookie is absent or invalid.
 * Safe to call from any Server Component.
 */
export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const value = cookieStore.get('lang')?.value;
  return value === 'en' ? 'en' : 'zh';
}

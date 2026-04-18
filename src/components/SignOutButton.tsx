'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton({ label = 'Sign Out' }: { label?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
    >
      {label}
    </button>
  );
}

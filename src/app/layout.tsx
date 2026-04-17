import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { SignOutButton } from '@/components/SignOutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'Full-stack e-commerce application',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-6">
                <Link href="/" className="text-xl font-bold text-indigo-600">
                  E-Shop
                </Link>
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                {session && (
                  <Link href="/orders" className="text-gray-600 hover:text-gray-900">
                    My Orders
                  </Link>
                )}
                {session?.user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                    Admin
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-4">
                {session ? (
                  <>
                    <span className="text-sm text-gray-600">
                      {session.user.email}
                      {session.user.role === 'ADMIN' && (
                        <span className="ml-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                          Admin
                        </span>
                      )}
                    </span>
                    <SignOutButton />
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-600 hover:text-gray-900">
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

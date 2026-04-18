import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/lib/auth';
import { AppProviders } from '@/components/AppProviders';
import { Header } from '@/components/Header';

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
  const sessionData = session
    ? { user: { email: session.user.email, role: session.user.role } }
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply saved theme before hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <AppProviders>
          <Header session={sessionData} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}

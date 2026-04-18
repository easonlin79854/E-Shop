import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex gap-8">
      <aside className="w-48 flex-shrink-0">
        <h2 className="font-bold text-lg mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="block text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block text-gray-600 hover:text-gray-900">
            Products
          </Link>
          <Link href="/admin/orders" className="block text-gray-600 hover:text-gray-900">
            Orders
          </Link>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

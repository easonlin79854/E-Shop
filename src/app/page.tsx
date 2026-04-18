import Link from 'next/link';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to E-Shop
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Your one-stop shop for everything
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/products"
          className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 text-lg"
        >
          Browse Products
        </Link>
        {!session && (
          <Link
            href="/register"
            className="border border-primary-600 text-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 text-lg"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}

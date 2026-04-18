import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CheckoutPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-md mx-auto text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600 mb-6">
        To place an order, visit a product page and click &quot;Buy Now&quot;.
      </p>
      <Link href="/products" className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700">
        Browse Products
      </Link>
    </div>
  );
}

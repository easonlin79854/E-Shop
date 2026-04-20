import { auth } from '@/lib/auth';
import { CartPageClient } from '@/components/CartPageClient';

export default async function CartPage() {
  const session = await auth();

  return <CartPageClient isLoggedIn={!!session} />;
}

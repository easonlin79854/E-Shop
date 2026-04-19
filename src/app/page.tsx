import { auth } from '@/lib/auth';
import { HomeClient } from '@/components/HomeClient';

export default async function Home() {
  const session = await auth();

  return <HomeClient isLoggedIn={!!session} />;
}

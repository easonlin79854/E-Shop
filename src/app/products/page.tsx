import { prisma } from '@/lib/prisma';
import { ProductsPageClient } from '@/components/ProductsPageClient';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  const serialized = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    imageUrl: p.imageUrl,
    stock: p.stock,
  }));

  return <ProductsPageClient products={serialized} />;
}

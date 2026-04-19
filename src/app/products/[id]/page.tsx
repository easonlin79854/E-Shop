import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id, isActive: true },
  });

  if (!product) {
    notFound();
  }

  const serialized = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    imageUrl: product.imageUrl,
    stock: product.stock,
  };

  return <ProductDetailClient product={serialized} />;
}

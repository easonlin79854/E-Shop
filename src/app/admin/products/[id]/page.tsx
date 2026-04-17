import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/ProductForm';

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === 'new';

  const product = isNew
    ? null
    : await prisma.product.findUnique({ where: { id } });

  if (!isNew && !product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {isNew ? 'Add Product' : 'Edit Product'}
      </h1>
      <ProductForm product={product} />
    </div>
  );
}

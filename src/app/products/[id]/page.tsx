import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { AddToCartForm } from '@/components/AddToCartForm';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id, isActive: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ${Number(product.price).toFixed(2)}
          </p>
          {product.description && (
            <p className="text-gray-600 mt-4">{product.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <div className="mt-6">
            <AddToCartForm product={{ id: product.id, name: product.name, price: Number(product.price), stock: product.stock }} />
          </div>
        </div>
      </div>
    </div>
  );
}

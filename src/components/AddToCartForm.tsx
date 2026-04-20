'use client';

import { useState } from 'react';
import { useLang } from './AppProviders';
import { translations } from '@/lib/i18n';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  stock: number;
}

export function AddToCartForm({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { lang } = useLang();
  const t = translations[lang];
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl ?? null,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {added && (
        <div className="text-green-600 text-sm">{t.addedToCart}</div>
      )}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">{t.cartQuantity}:</label>
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-20 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md px-3 py-1"
        />
      </div>
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 disabled:opacity-50"
      >
        {product.stock === 0 ? t.outOfStock : t.addToCart}
      </button>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useState } from 'react';
import { OrderModal } from './order-modal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOrderModalOpen(true);
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col">
      {/* Image Container - Link */}
      <Link href={`/products/${product.id}`} className="block relative h-64 overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isPujaSpecial && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            Puja Special
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discount}% Off
          </div>
        )}
        <button className="absolute bottom-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
          <Heart size={18} className="text-primary" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <div className="mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              {product.category}
            </span>
          </div>

          <h3 className="font-serif font-semibold text-lg text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
        </Link>

        {/* Segment Badge */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-secondary text-foreground capitalize">
            {product.segment}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-serif text-xl font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Order Now Button */}
        <button
          onClick={handleOrderClick}
          className="w-full mt-auto py-2 rounded-lg transition-all font-medium bg-primary text-white hover:bg-primary/90"
        >
          Order Now
        </button>
      </div>

      {/* Order Modal */}
      <OrderModal product={product} isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
}

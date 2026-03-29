'use client';

import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { Footer } from '@/components/footer';
import { OrderModal } from '@/components/order-modal';
import { PRODUCTS, getProductById } from '@/lib/products';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Star, Share2, Check } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Fix hydration issue (no Math.random in render)
  const [reviewCount] = useState(() => Math.floor(Math.random() * 200 + 50));

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Product not found</h1>
            <Link href="/collections" className="text-primary hover:text-primary/80">
              Back to Collections
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* ✅ FIXED: Proper main wrapper */}
      <main>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <Link href="/" className="text-primary hover:text-primary/80 transition">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link href="/collections" className="text-primary hover:text-primary/80 transition">
            Collections
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-semibold">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                  Sale -{discount}%
                </div>
              )}

              {product.isFestival && (
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-semibold text-sm">
                  Puja Special
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-4xl font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">
                    You save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </p>
                </div>

                {/* Product Details */}
                <div className="space-y-4 mb-8 pb-8 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Fabric</p>
                    <p className="text-foreground font-semibold">{product.fabric}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="text-foreground font-semibold">{product.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Work</p>
                    <p className="text-foreground font-semibold">{product.work}</p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-secondary"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-16 text-center border-l border-r bg-transparent"
                      />

                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">In Stock</p>
                  </div>

                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
                  >
                    Order Now
                  </button>

                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="w-full py-3 rounded-lg border flex justify-center gap-2"
                  >
                    <Heart size={20} />
                    {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                  </button>

                  <button className="w-full py-3 rounded-lg border flex justify-center gap-2">
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 pt-8 border-t">
                {[
                  'Free shipping on orders above ₹2000',
                  '7-day easy returns',
                  'Secure payment options',
                  'WhatsApp updates',
                ].map((b, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <Check size={16} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {product && (
        <OrderModal
          product={product}
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </div>
  );
}
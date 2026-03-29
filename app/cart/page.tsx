'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, mounted } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [applied, setApplied] = useState(false);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
          <div className="animate-pulse">
            <div className="h-10 bg-secondary rounded mb-4 w-1/3"></div>
            <div className="h-64 bg-secondary rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.1);
  const discount = applied ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setApplied(true);
      setTimeout(() => setApplied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-secondary rounded-lg p-8 mb-6">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Browse our collection and add some beautiful sarees to your cart
              </p>
              <Link
                href="/collections"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-6 border-b border-border flex gap-4 last:border-b-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.product.category}
                      </p>
                      <p className="text-primary font-bold mt-2">₹{item.product.price}</p>

                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-secondary transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-secondary transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="mt-4 text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-xl font-serif font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Shipping {shipping === 0 ? '(Free)' : ''}
                    </span>
                    <span className="text-foreground font-medium">₹{shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground font-medium">₹{tax}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (5%)</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-foreground bg-background text-sm"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                  {applied && (
                    <p className="text-sm text-green-600">Promo code applied!</p>
                  )}
                </div>

                <div className="bg-secondary rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full block text-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold mb-3"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/collections"
                  className="w-full block text-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
                >
                  Continue Shopping
                </Link>

                <div className="mt-6 space-y-3 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✓</span>
                    <span>Free shipping on orders above ₹5000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✓</span>
                    <span>7-day easy returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✓</span>
                    <span>Secure payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

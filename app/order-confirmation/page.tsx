'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

import Link from 'next/link';
import { CheckCircle, Mail, MessageCircle } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';

interface OrderData {
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  customer: {
    name: string;
    phone: string;
    location: string;
  };
  status: 'pending' | 'completed' | 'cancelled';
  paymentQR: string;
  createdAt: string;
  completedAt?: string;
}

/* ✅ Move logic here */
function OrderConfirmationContent() {
  

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        setOrderData(JSON.parse(lastOrder));
      } catch {
        console.log('Error parsing order data');
      }
    }
  }, []);

  if (!mounted) {
    return (
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-secondary rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-secondary rounded"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
      {orderData ? (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle size={80} className="text-green-500" />
          </div>

          <h1 className="font-serif text-4xl font-bold mb-2">
            Order Confirmed!
          </h1>

          <p className="mb-8 text-lg">
            Thank you {orderData.customer.name} for your purchase.
          </p>

          <div className="bg-card rounded-lg border p-8 mb-8">
            <p className="text-sm mb-1">Order Number</p>
            <p className="text-2xl font-bold text-primary">
              {orderData.orderId}
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/" className="flex-1 px-6 py-3 bg-primary text-white rounded-lg">
              Back to Home
            </Link>
            <Link href="/collections" className="flex-1 px-6 py-3 border rounded-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Order Found</h1>
          <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg">
            Back to Home
          </Link>
        </div>
      )}
    </main>
  );
}

/* ✅ Wrap with Suspense */
export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <OrderConfirmationContent />
      </Suspense>

      <Footer />
    </div>
  );
}
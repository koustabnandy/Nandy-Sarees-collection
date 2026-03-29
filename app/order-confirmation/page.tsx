'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderData {
  orderId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  customer: {
    name: string;
  };
}

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        setOrderData(JSON.parse(lastOrder));
      } catch {
        console.log('Error parsing order data');
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 text-center">
        {orderData ? (
          <>
            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />

            <h1 className="text-4xl font-bold mb-4">
              Order Confirmed!
            </h1>

            <p className="mb-6">
              Thank you {orderData.customer.name}
            </p>

            <p className="text-xl font-semibold mb-8">
              Order ID: {orderData.orderId}
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg">
                Home
              </Link>
              <Link href="/collections" className="px-6 py-3 border rounded-lg">
                Shop More
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">No Order Found</h1>
            <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg">
              Back to Home
            </Link>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
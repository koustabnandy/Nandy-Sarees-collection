'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Order Confirmed</h1>
          <p className="mt-2">Order ID: {orderId}</p>

          <Link href="/" className="mt-6 inline-block text-primary">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
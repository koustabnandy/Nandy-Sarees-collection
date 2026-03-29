'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

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

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        setOrderData(JSON.parse(lastOrder));
      } catch (e) {
        console.log('Error parsing order data');
      }
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
          <div className="animate-pulse">
            <div className="h-10 bg-secondary rounded mb-4 w-1/3"></div>
            <div className="h-64 bg-secondary rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        {orderData ? (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle size={80} className="text-green-500" />
            </div>

            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Thank you {orderData.customer.name} for your purchase. Your order has been received.
            </p>

            <div className="bg-card rounded-lg border border-border p-8 mb-8">
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-2xl font-bold text-primary">{orderData.orderId}</p>
              </div>

              <div className="space-y-4 text-left mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Order Status</p>
                  <p className="font-semibold text-foreground capitalize">{orderData.status}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your order will be dispatched within 24-48 hours
                  </p>
                </div>
                
                <div className="mt-4 pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Order Item</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-foreground">
                      <span>{orderData.productName} x {orderData.quantity}</span>
                      <span>₹{(orderData.productPrice * orderData.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between font-semibold text-foreground">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{(orderData.productPrice * orderData.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Delivery Details</p>
                  <p className="text-sm text-foreground font-medium">
                    {orderData.customer.name}
                  </p>
                  <p className="text-sm text-foreground">
                    {orderData.customer.location}
                  </p>
                  <p className="text-sm text-foreground">
                    Phone: {orderData.customer.phone}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Estimated Delivery: 5-7 business days
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                  <Mail size={24} className="text-primary flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">Order Confirmation Email</p>
                    <p className="text-xs text-muted-foreground">
                      A detailed confirmation has been sent to your email
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                  <MessageCircle size={24} className="text-primary flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">WhatsApp Updates</p>
                    <p className="text-xs text-muted-foreground">
                      Tracking updates will be sent via WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-lg font-serif font-bold text-foreground text-left">
                What Next?
              </h2>
              <div className="space-y-3">
                <div className="p-4 border border-border rounded-lg text-left">
                  <p className="font-medium text-foreground mb-1">1. Track Your Order</p>
                  <p className="text-sm text-muted-foreground">
                    Check the status of your order anytime using your order number
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg text-left">
                  <p className="font-medium text-foreground mb-1">2. Receive Your Saree</p>
                  <p className="text-sm text-muted-foreground">
                    Your beautiful saree will be delivered to your address within 3-5 business days
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg text-left">
                  <p className="font-medium text-foreground mb-1">3. Enjoy & Return</p>
                  <p className="text-sm text-muted-foreground">
                    If you're not satisfied, return it within 7 days for a full refund
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Back to Home
              </Link>
              <Link
                href="/collections"
                className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-semibold"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              Questions? <Link href="/contacts" className="text-primary hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              No Order Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find your order details. Please check your email or contact support.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90">
                Back to Home
              </Link>
              <Link href="/contacts" className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary">
                Contact Support
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

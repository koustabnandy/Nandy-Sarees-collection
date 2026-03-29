'use client';

import { useState } from 'react';
import { X, Check, Copy } from 'lucide-react';
import type { Product } from '@/lib/products';
import { saveOrderToFirebase } from '@/lib/firebase';
import type { OrderData } from '@/lib/firebase';
import { generatePaymentQRCodeURL, generateUPIString } from '@/lib/qr-generator';

interface OrderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ product, isOpen, onClose }: OrderModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState('');
  const [upiString, setUpiString] = useState('');

  // Replace with your actual UPI ID
  const UPI_ID = 'your-upi-id@upi';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Please enter your delivery location');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Generate order ID
      const newOrderId = `ORD-${Date.now()}`;
      setOrderId(newOrderId);

      // Generate UPI string and QR code
      const generatedUpiString = generateUPIString(UPI_ID, 'SareeBliss', product.price, newOrderId);
      const qrURL = generatePaymentQRCodeURL(generatedUpiString);
      setUpiString(generatedUpiString);
      setQrCodeURL(qrURL);

      // Create order data
      const orderData: OrderData = {
        orderId: newOrderId,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        quantity: 1,
        customer: {
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
        },
        status: 'pending',
        paymentQR: generatedUpiString,
        createdAt: new Date().toISOString(),
      };

      // Save to Firebase/localStorage
      await saveOrderToFirebase(orderData);

      setStep('payment');
    } catch (err) {
      setError('Failed to create order. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = async () => {
    setLoading(true);
    try {
      // Update order status to completed
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderIndex = orders.findIndex((o: OrderData) => o.orderId === orderId);
      if (orderIndex !== -1) {
        orders[orderIndex].status = 'completed';
        orders[orderIndex].completedAt = new Date().toISOString();
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('lastOrder', JSON.stringify(orders[orderIndex]));
      }

      setStep('confirmation');
    } catch (err) {
      setError('Failed to confirm payment. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyUPI = () => {
    const textToCopy = upiString || `upi://pay?pa=${UPI_ID}&pn=SareeBliss&am=${product.price}&tn=Order${orderId}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="font-serif text-2xl font-bold text-foreground">Order Now</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 hover:bg-secondary rounded transition-colors disabled:opacity-50"
          >
            <X size={24} className="text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Summary */}
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{product.name}</h3>
                <p className="text-primary font-bold mt-1">₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}

          {/* FORM STEP */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Delivery Location
                </label>
                <textarea
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all"
              >
                {loading ? 'Creating Order...' : 'Continue to Payment'}
              </button>
            </form>
          )}

          {/* PAYMENT STEP */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Order ID</p>
                <p className="font-mono font-bold text-lg text-primary">{orderId}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-blue-900 mb-4">Scan to Pay</p>
                {qrCodeURL ? (
                  <div className="bg-white p-4 rounded-lg inline-block border-2 border-blue-200">
                    <img
                      src={qrCodeURL}
                      alt="Payment QR Code"
                      width={200}
                      height={200}
                      className="w-52 h-52"
                    />
                  </div>
                ) : (
                  <div className="w-52 h-52 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-gray-600">Generating QR Code...</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  Scan QR code with any UPI app to complete payment
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Or pay using UPI ID</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiString || `upi://pay?pa=${UPI_ID}&pn=SareeBliss&am=${product.price}`}
                      readOnly
                      className="flex-1 px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground"
                    />
                    <button
                      onClick={copyUPI}
                      className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center gap-1"
                    >
                      {copiedUPI ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                  Amount to pay: <span className="font-bold">₹{product.price}</span>
                </div>
              </div>

              <button
                onClick={handlePaymentComplete}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-all"
              >
                {loading ? 'Processing...' : 'Payment Completed'}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Click above after completing the payment in your UPI app
              </p>
            </div>
          )}

          {/* CONFIRMATION STEP */}
          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check size={32} className="text-green-600" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Order Confirmed
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your order has been successfully placed
                </p>
              </div>

              <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-semibold text-foreground">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product:</span>
                  <span className="font-semibold text-foreground">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-primary">₹{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold text-foreground">{formData.name}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                A confirmation SMS will be sent to {formData.phone}
              </div>

              <button
                onClick={onClose}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                Close
              </button>
            </div>
          )}

          {step === 'form' && (
            <p className="text-xs text-muted-foreground text-center">
              Your information is secure and used only for order processing
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { saveOrderToFirebase } from "@/lib/firebase";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { serverTimestamp } from "firebase/firestore";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { items, mounted, clearCart } = useCart();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  // ✅ Order calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.1);
  const orderTotal = subtotal + shipping + tax;

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div>
        <Header />
        <h1>Your cart is empty</h1>
        <Link href="/collections">Return to shopping</Link>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ MAIN SUBMIT FUNCTION
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const orderId = "ORD-" + Date.now();

      const orderData = {
        orderId,
        fullName: formData.firstName + " " + formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,

        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),

        subtotal,
        shipping,
        tax,
        total: orderTotal,

        paymentMethod: formData.paymentMethod,
        status: "pending",

        orderDate: serverTimestamp(),
        estimatedDelivery: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000
        ).toDateString(),
      };

      console.log("Submitting order:", orderData);

      // ✅ ONLY FIREBASE SAVE
      try {
  await saveOrderToFirebase(orderData);
} catch (error) {
  console.error("Firebase error:", error);
  alert("Order failed. Please try again.");
  return;
}
      setSubmitted(true);
      clearCart();

      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${orderId}`);
      }, 1500);

    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />

        <button type="submit" disabled={submitted}>
  {submitted ? "Processing..." : "Place Order"}
</button>
      </form>

      <Footer />
    </div>
  );
}
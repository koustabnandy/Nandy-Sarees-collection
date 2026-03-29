import OrderClient from "./OrderClient";
import { Suspense } from "react";

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <OrderClient />
    </Suspense>
  );
}
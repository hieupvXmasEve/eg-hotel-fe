"use client";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./checkout-page";
import { convertToSubcurrency } from "@/lib/convertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/lib/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutElement() {
  const amount = 49.99;
  const roomId = 1;
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd",
      }}
    >
      <CheckoutPage amount={amount} roomId={roomId} />
    </Elements>
  );
}

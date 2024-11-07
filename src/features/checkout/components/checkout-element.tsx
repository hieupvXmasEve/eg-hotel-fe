"use client";

import { convertToSubCurrency } from "@/lib/convertToSubcurrency";
import { env } from "@/lib/env";
import { Elements } from "@stripe/react-stripe-js";
import {
  loadStripe,
  StripeElementsOptionsClientSecret,
} from "@stripe/stripe-js";
import CheckoutPage from "./checkout-page";
import React from "react";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutElement({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = React.useState("");

  // const [dpmCheckerLink, setDpmCheckerLink] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/room/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        // setDpmCheckerLink(data.dpmCheckerLink);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const options: StripeElementsOptionsClientSecret = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutPage amount={amount} />
        </Elements>
      )}
    </>
  );
}

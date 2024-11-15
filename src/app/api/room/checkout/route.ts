import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2024-09-30.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const { amount, paymentMethodId } = await request.json();
    console.log(amount, paymentMethodId);
    await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method: paymentMethodId,
      confirm: true,
      error_on_requires_action: true,
    });
    return NextResponse.json(
      { message: "Payment successful" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}

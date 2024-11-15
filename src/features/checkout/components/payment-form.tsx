"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { convertToSubCurrency } from "@/lib/convertToSubcurrency";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { useState } from "react";

// const roomReservation = {
//   checkIn: new Date(),
//   checkOut: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//   room: {
//     name: "Premier Deluxe Twin Room",
//     price: 180,
//     amenities: ["Pool", "Spa"],
//     image: "/images/rooms/demo.jpg",
//   },
// };

export default function PaymentForm() {
  const t = useTranslations("checkout");
  const amount = 3;

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(1, t("form.first-name-required")),
    lastName: z.string().min(1, t("form.last-name-required")),
    email: z.string().email(t("form.email-required")),
    phone: z.string().min(1, t("form.phone-required")),
    country: z.string().min(1, t("form.country-required")),
    specialRequests: z.string().optional(),
    // ... other fields ...
    cardHolder: z.string().min(1, t("form.card-holder-required")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "hieu",
      lastName: "pv",
      email: "hieunuce11@gmail.com",
      phone: "123456789",
      country: "vn",
      specialRequests: "",
      // card info
      cardHolder: "Pham Hieu",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);
    if (!stripe || !elements) {
      return;
    }
    try {
      // Confirm the PaymentIntent on the client
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: values.firstName + " " + values.lastName,
          email: values.email,
          phone: values.phone,
        },
      });
      console.log("paymentMethod", paymentMethod?.id);
      // return_url: `${env.NEXT_PUBLIC_FRONTEND_URL}/${locale}/payment-success?amount=${amount}`,

      if (error) {
        // This point is only reached if there's an immediate error when
        // confirming the payment. Show the error to your customer (for example, payment details incomplete)
        setErrorMessage(error.message);
      } else {
        // Create a PaymentIntent on the server
        const response = await fetch("/api/room/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: convertToSubCurrency(amount),
            paymentMethodId: paymentMethod?.id,
          }),
        });
        const data = await response.json();
        console.log("data", data);
        // The payment UI automatically closes with a success animation.
        // Your customer is redirected to your `return_url`.
        // First make the booking payment API call
        // const bookingResponse = await fetch('/api/booking/payment', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ amount }),
        // });
        // if (!bookingResponse.ok) {
        //   throw new Error('Failed to process booking');
        // }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <p className="text-sm text-muted-foreground">
        <span className="text-red-500">*</span> Required
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("form.first-name")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("form.last-name")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("form.email")} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>
                  {t("form.country-code")}{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States (+1)</SelectItem>
                      <SelectItem value="uk">United Kingdom (+44)</SelectItem>
                      <SelectItem value="vn">Vietnam (+84)</SelectItem>
                      {/* Add more country options as needed */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>
                  {t("form.phone")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.special-requests")}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t("payment-method")}</h2>
          <div className="rounded-lg border p-4">
            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="capitalize">
                    {t("form.card-holder")}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardElement
              className="mb-2 rounded-md border p-2"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />

            {errorMessage && <div>{errorMessage}</div>}

            <Button
              disabled={!stripe || loading}
              className="mt-2 w-full rounded-md p-5 font-bold text-white disabled:animate-pulse disabled:opacity-50"
            >
              {!loading ? `Pay $${amount}` : "Processing..."}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

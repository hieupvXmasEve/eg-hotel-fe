import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
export default function PaymentSuccessPage() {
  // const amount =
  //   typeof searchParams.amount === "string"
  //     ? parseFloat(searchParams.amount)
  //     : 1;
  // const paymentIntent =
  //   typeof searchParams.payment_intent === "string"
  //     ? searchParams.payment_intent
  //     : "pi_3QIYLVGEd0B4Mapu0On5tH0E";
  // const redirectStatus =
  //   typeof searchParams.redirect_status === "string"
  //     ? searchParams.redirect_status
  //     : "succeeded";

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="animate-check-draw text-green-600 [stroke-dasharray:100] [stroke-dashoffset:100]"
                d="M4 12L9 17L20 6"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Successful
          </CardTitle>
          <CardDescription className="text-gray-600">
            Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="text-center">
            <Link href="/my-account/order-history" className="">
              <Button variant="link" className="mt-2 p-0">
                View order
              </Button>
            </Link>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

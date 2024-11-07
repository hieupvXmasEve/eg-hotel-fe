import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const amount =
    typeof searchParams.amount === "string"
      ? parseFloat(searchParams.amount)
      : 1;
  const paymentIntent =
    typeof searchParams.payment_intent === "string"
      ? searchParams.payment_intent
      : "pi_3QIYLVGEd0B4Mapu0On5tH0E";
  const redirectStatus =
    typeof searchParams.redirect_status === "string"
      ? searchParams.redirect_status
      : "succeeded";

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
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Amount</dt>
              <dd className="mt-1 text-sm text-gray-900">
                ${amount.toFixed(2)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm capitalize text-green-600">
                {redirectStatus}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Payment Intent ID
              </dt>
              <dd className="mt-1 break-all text-sm text-gray-900">
                {paymentIntent}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

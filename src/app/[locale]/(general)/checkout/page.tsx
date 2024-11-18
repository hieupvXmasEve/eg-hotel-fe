"use client";

import { Bed, InfoIcon, Users } from "lucide-react";
import Image from "next/image";

import { PoolIcon, SpaIcon } from "@/components/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import PaymentForm from "@/features/checkout/components/payment-form";
import { env } from "@/lib/env";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { differenceInDays, format } from "date-fns";
import { useRouter } from "@/i18n/routing";
import { BookingRoom } from "@/types/booking-room";
import Rating from "@/features/rooms/components/rating";
import { useTranslations } from "next-intl";
import { useUser } from "@/components/user-context";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function HotelCheckout() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const dataBooking: BookingRoom | null = localStorage.getItem("dataBooking")
    ? JSON.parse(localStorage.getItem("dataBooking") as string)
    : null;

  if (!dataBooking) return router.push("/");
  const nights = differenceInDays(
    new Date(dataBooking.dateTo),
    new Date(dataBooking.dateFrom),
  );
  const roomPrice = isAuthenticated
    ? dataBooking.roomDetail.member_price
    : dataBooking.roomDetail.non_member_price;
  return (
    <div className="grid gap-6 lg:grid-cols-10">
      {/* Left Section */}
      <div className="space-y-6 lg:col-span-5">
        <div>
          <h1 className="text-2xl font-bold">Who&apos;s checking in?</h1>
          <p className="text-sm text-muted-foreground">
            Sign in for faster checkout.
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={Math.round(roomPrice * nights * 100) / 100}
            dataBooking={dataBooking}
          />
        </Elements>
      </div>
      <div className="col-span-1"></div>
      {/* Right Section */}
      <div className="lg:col-span-4">
        <div className="rounded-lg border">
          {/* Room Image */}
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={
                dataBooking.roomDetail.room_images?.length > 0
                  ? dataBooking.roomDetail.room_images[0]!.image_url
                  : "/images/rooms/demo.jpg"
              }
              alt={dataBooking?.roomDetail.room_name}
              width={600}
              height={400}
              className="object-cover"
              unoptimized
            />
          </div>
          {/* Room Details */}
          <div className="p-3">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                {dataBooking?.roomDetail.room_name}
              </h2>
              <div className="flex items-center space-x-1">
                <Rating value={dataBooking?.roomDetail.stars || 0} />
                <span className="text-sm text-muted-foreground">
                  ({dataBooking?.roomDetail.rate || 0} reviews)
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4 rounded-lg">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Check-in</span>
                  <span className="text-sm font-bold">
                    {format(dataBooking.dateFrom, "EEE, MMM d YYY")} - 2:00pm
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Check-out</span>
                  <span className="text-sm font-bold">
                    {format(dataBooking.dateTo, "EEE, MMM d YYY")} - 12:00pm
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="font-semibold">
                {dataBooking.roomDetail.room_type_name}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  <span className="text-sm text-muted-foreground">
                    2 Twin Beds
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm text-muted-foreground">
                    Sleeps 2
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PoolIcon className="h-5 w-5" />
                  <span className="text-sm text-muted-foreground">Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <SpaIcon className="h-5 w-5" />
                  <span className="text-sm text-muted-foreground">Spa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Price Details */}
        <div className="mt-5 rounded-lg border p-3">
          <h3 className="text-2xl font-semibold">Price details</h3>
          <div className="flex justify-between text-xs">
            <span>
              {nights} {nights > 1 ? t("nights") : t("night")}
            </span>
            <span>${(roomPrice * nights).toFixed(2)}</span>
          </div>
          <div className="mt-3 flex justify-between text-xs">
            <Popover>
              <PopoverTrigger>
                <div className="flex cursor-pointer items-center gap-1 hover:underline">
                  {t("taxes-and-fees")} <InfoIcon className="h-4 w-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent align="start" className="text-xs">
                The taxes are tax recovery charges Expedia pays to its vendors
                (e.g. hotels); for details, please see our Terms of Use. We
                retain our service fees as compensation in servicing your travel
                reservation.
              </PopoverContent>
            </Popover>

            <span>$0</span>
          </div>
          <Separator className="my-4" />

          <div className="flex justify-between font-semibold">
            <span>Total (USD)</span>
            <span>${(roomPrice * nights + 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

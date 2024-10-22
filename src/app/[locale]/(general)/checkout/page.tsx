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
import { Bed, InfoIcon, Star, Users } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PoolIcon, SpaIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import CheckoutElement from "@/features/checkout/components/checkout-element";

const roomReservation = {
  checkIn: new Date(),
  checkOut: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  room: {
    name: "Premier Deluxe Twin Room",
    price: 180,
    amenities: ["Pool", "Spa"],
    image: "/images/rooms/demo.jpg",
  },
};

const formSchema = z.object({
  firstName: z.string().min(1, "Tên không được để trống"),
  lastName: z.string().min(1, "Họ không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  country: z.string().min(1, "Mã quốc gia không được để trống"),
  specialRequests: z.string().optional(),
  // ... other fields ...
});

export default function HotelCheckout() {
  const t = useTranslations("checkout");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "vn",
      specialRequests: "",
      // ... other fields ...
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                      {t("form.first-name")}{" "}
                      <span className="text-red-500">*</span>
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
                      {t("form.last-name")}{" "}
                      <span className="text-red-500">*</span>
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
                          <SelectItem value="uk">
                            United Kingdom (+44)
                          </SelectItem>
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
            <Button type="submit" className="w-full">
              {t("form.complete-booking")}
            </Button>
          </form>
        </Form>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t("payment-method")}</h2>
          <div className="rounded-lg border p-4">
            <CheckoutElement />
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
      {/* Right Section */}
      <div className="lg:col-span-4">
        <div className="rounded-lg border">
          {/* Room Image */}
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={roomReservation.room.image}
              alt={roomReservation.room.name}
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
          {/* Room Details */}
          <div className="p-3">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Luxury Resort & Spa</h2>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <span className="text-sm text-muted-foreground">
                  (245 reviews)
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4 rounded-lg">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Check-in</span>
                  <span className="text-sm font-bold">
                    {format(roomReservation.checkIn, "EEE, MMM d")}, 2:00pm
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Check-out</span>
                  <span className="text-sm font-bold">
                    {format(roomReservation.checkOut, "EEE, MMM d")}, 12:00pm
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="font-semibold">Premier Deluxe Twin Room</h3>
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
            <span>1 night</span>
            <span>$180.00</span>
          </div>
          <div className="mt-3 flex justify-between text-xs">
            <Popover>
              <PopoverTrigger>
                <div className="flex cursor-pointer items-center gap-1 hover:underline">
                  Taxes and fees <InfoIcon className="h-4 w-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent align="start" className="text-xs">
                The taxes are tax recovery charges Expedia pays to its vendors
                (e.g. hotels); for details, please see our Terms of Use. We
                retain our service fees as compensation in servicing your travel
                reservation.
              </PopoverContent>
            </Popover>

            <span>$21.60</span>
          </div>
          <Separator className="my-4" />

          <div className="flex justify-between font-semibold">
            <span>Total (USD)</span>
            <span>$201.60</span>
          </div>
        </div>
      </div>
    </div>
  );
}

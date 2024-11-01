"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Rating from "@/features/rooms/components/rating";
import { Baby, Bed, ChevronRight, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { OrderHistory } from "../data/use-get-orders";

export default function ListOrder({ data }: { data: OrderHistory[] }) {
  const t = useTranslations("order-history");
  const [selectedBooking, setSelectedBooking] = useState<OrderHistory | null>(
    null,
  );

  if (data.length === 0) return <div className="text-center">No data</div>;
  return (
    <div className="space-y-4">
      {data?.map((booking) => (
        <Card key={booking.id} className="">
          <div className="flex items-center">
            <div className="relative aspect-square w-28 flex-shrink-0 p-2">
              <Image
                src={booking.image}
                alt={booking.hotelName}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <CardContent className="flex flex-col-reverse p-1 md:flex-1 md:flex-row md:items-start md:justify-between md:pr-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {t("room")} {booking.roomNumber}
                </h2>
                <p className="text-sm text-gray-500">{booking.location}</p>
                <p className="text-sm">
                  {booking.checkIn} - {booking.checkOut}
                </p>
                <Badge
                  variant={
                    booking.status === "Successful" ? "success" : "destructive"
                  }
                  className="hidden md:inline-block"
                >
                  {booking.status}
                </Badge>
              </div>
              {/* price */}
              <div>
                <p className="font-bold">USD {booking.price.toFixed(2)}</p>
              </div>
            </CardContent>
          </div>
          <div className="border-t">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between"
              onClick={() => setSelectedBooking(booking)}
            >
              <span>{t("booking-info")}</span>{" "}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
      <Dialog
        open={selectedBooking !== null}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="flex h-full flex-col px-0 pb-24 focus:outline-none sm:w-full md:max-w-[600px] md:pb-0">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-center">
              {t("booking-details")}
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="flex-grow overflow-y-auto px-4">
              <div className="mb-4 rounded-lg bg-purple-500 p-4 text-white">
                <h3 className="font-semibold">{selectedBooking.hotelName}</h3>
                <div className="flex items-center">
                  <Rating value={4.5} />
                  <span className="ml-2 text-sm">8.4/10</span>
                </div>
                <p className="mt-1 text-sm">
                  Comfortable hotel with a full-service spa and airport shuttle
                  service
                </p>
              </div>
              <Separator className="my-4" />
              <p className="mb-4 text-sm text-gray-500">
                Srok Kram Commune, 9V8H+F95 Chong Kao Sou Village, Street 60,
                Krong Siem Reap 17252, Cambodia
              </p>
              <Separator className="my-4" />
              <div className="mb-4 grid grid-cols-2">
                <div>
                  <p className="font-semibold">Check-in</p>
                  <p className="text-sm font-semibold text-primary">
                    {selectedBooking.checkIn}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Check-out</p>
                  <p className="text-sm font-semibold text-primary">
                    {selectedBooking.checkOut}
                  </p>
                </div>
              </div>

              <p className="mb-2 font-semibold">Number of rooms and guests</p>
              <p className="text-sm font-semibold text-primary">
                1 room, 2 adults, 0 children
              </p>
              <Separator className="my-4" />
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Total Price</p>
                  <p className="text-2xl font-bold">
                    USD {selectedBooking.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm text-gray-500">Taxes and fees included</p>
                <p className="text-sm text-gray-500">
                  Pay at the check-in counter
                </p>
              </div>
              <div className="my-4">
                <div className="rounded-xl border p-4">
                  <p className="font-semibold">Deluxe Room</p>
                  <div className="mt-2 flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>2 Adult</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm">
                    <Baby className="mr-2 h-4 w-4" />
                    <span>0 children</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm">
                    <Bed className="mr-2 h-4 w-4" />
                    <span>2 bed</span>
                  </div>
                </div>
                <Button variant="link" className="mt-2 p-0">
                  See room detail
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

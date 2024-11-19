import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { OrderHistory } from "../data/use-get-orders";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface OrderCardProps {
  booking: OrderHistory;
  current_page: number;
  t: Awaited<ReturnType<typeof getTranslations<"order-history">>>;
}

export default function OrderCard({
  booking,
  t,
  current_page,
}: OrderCardProps) {
  return (
    <Card className="">
      <div className="flex items-center">
        <div className="relative aspect-square w-28 flex-shrink-0 p-2">
          <Image
            src={
              booking.room_image ? booking.room_image : "/images/rooms/demo.jpg"
            }
            alt={booking.room_name}
            width={598}
            height={402}
            className="h-full w-auto rounded-lg object-cover object-center"
            unoptimized
          />
        </div>
        <CardContent className="flex flex-col-reverse p-1 md:flex-1 md:flex-row md:items-start md:justify-between md:pr-4">
          <div>
            <h2 className="text-lg font-semibold">
              {t("room")} {booking.room_name}
            </h2>
            <p className="text-sm text-gray-500">{booking.address}</p>
            <p className="text-sm">
              {format(booking.check_in, "EEE, MMM d yyy")}&nbsp;-&nbsp;
              {format(booking.check_out, "EEE, MMM d yyy")}
            </p>
            <Badge
              variant={booking.payment_status === 1 ? "success" : "destructive"}
              className="hidden md:inline-block"
            >
              {booking.payment_status === 1 ? "Successful" : "Failed"}
            </Badge>
          </div>
          {/* price */}
          <div>
            <p className="font-bold">USD {booking.total_price.toFixed(2)}</p>
          </div>
        </CardContent>
      </div>
      <Link
        href={`?page=${current_page || 1}&modal=true&bookingid=${booking.booking_id}`}
        className="border-t"
      >
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between"
          // onClick={() => setSelectedBooking(booking)}
        >
          <span>{t("booking-info")}</span>{" "}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </Card>
  );
}

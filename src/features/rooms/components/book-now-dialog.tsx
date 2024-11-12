"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CheckoutElement from "@/features/checkout/components/checkout-element";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Baby, Banknote, Bed, Check, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRoomDetail } from "../stores/use-room-detail";
import Rating from "./rating";

type BookingResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export default function BookNowDialog({
  showCheckout,
  setShowCheckout,
}: {
  showCheckout: boolean;
  setShowCheckout: (show: boolean) => void;
}) {
  const t = useTranslations("room.book-now");
  const roomDetail = useRoomDetail((state) => state.roomDetail);
  const dateFrom = useRoomDetail((state) => state.dateFrom);
  const dateTo = useRoomDetail((state) => state.dateTo);
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    if (!roomDetail) return;
    setIsLoading(true);

    const makeBookingRequest = async (): Promise<BookingResponse> => {
      const response = await fetch("/api/room/booking", {
        method: "POST",
        body: JSON.stringify({
          roomId: roomDetail.room_id,
          dateFrom,
          dateTo,
        }),
      });

      return response.json();
    };

    try {
      // First attempt
      let result = await makeBookingRequest();
      console.log("result", result);
      if (!result.success) {
        // Second attempt
        result = await makeBookingRequest();

        if (!result.success) {
          throw new Error(result.message || "Booking failed");
        }
      }

      toast.success(t("booking-success"));
      // setShowCheckout(false);
      // router.push("/bookings"); // Redirect to bookings page
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t("booking-error"));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!roomDetail) return null;

  return (
    <Dialog open={showCheckout}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="flex h-[90%] w-full flex-col px-0 pb-24 focus:outline-none sm:w-full md:max-w-4xl md:pb-4"
      >
        <DialogHeader>
          <DialogTitle className="px-4">{t("booking-details")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto px-4">
          <div className="mb-4 rounded-lg border">
            <div className="mb-4 rounded-lg bg-gradient-to-b from-[#8664E2] to-[#6558CD] p-4 text-white">
              <h3 className="font-semibold">{roomDetail.hotel_name}</h3>
              <div className="flex items-center">
                <Rating value={4.5} />
                <span className="ml-2 text-sm">8.4/10</span>
              </div>
              <p className="mt-1 text-sm">
                Comfortable hotel with a full-service spa and airport shuttle
                service
              </p>
            </div>

            <p className="mb-4 px-4 text-sm text-gray-500">
              Srok Kram Commune, 9V8H+F95 Chong Kao Sou Village, Street 60,
              Krong Siem Reap 17252, Cambodia
            </p>
            <Separator className="m-4 w-auto px-4" />
            <div className="px-4 pb-4">
              <p className="mb-2 font-semibold">Number of rooms and guests</p>
              <p className="text-sm font-semibold text-primary">
                1 room, 2 adults, 0 children
              </p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 rounded-lg border p-4">
            <div>
              <p className="font-semibold">Check-in</p>
              <p className="text-sm font-semibold text-primary">
                {dateFrom} | {roomDetail.check_in}
              </p>
            </div>
            <div>
              <p className="font-semibold">Check-out</p>
              <p className="text-sm font-semibold text-primary">
                {dateTo} | {roomDetail.check_out}
              </p>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Total Price</p>
              <p className="text-2xl font-bold">
                USD {roomDetail.non_member_price}
              </p>
            </div>
            <Separator className="my-4 px-4" />

            <p className="text-sm text-gray-500">Price infomation</p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <Banknote className="h-4 w-4" /> Taxes and fees included
            </p>
          </div>

          <div className="my-4">
            <div className="rounded-lg border p-4">
              <p className="font-semibold">Cancellation policy</p>
              <p className="flex items-center gap-1 text-sm text-green-500">
                <Check className="size-6 rounded-full bg-green-500 p-1 text-white" />
                Free cancel before Sat 1 Sept
              </p>
            </div>
          </div>
          <div className="my-4">
            <p className="mb-2 px-4 text-xl font-semibold">Your choice</p>

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
          </div>
          <CheckoutElement amount={roomDetail.non_member_price} />
        </ScrollArea>
        <DialogClose
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setShowCheckout(false)}
        >
          <Cross1Icon />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Rating from "@/features/rooms/components/rating";
import { Baby, Bed, Users } from "lucide-react";
import { getBookingDetail } from "../data/get-booking-detail";
import { getTranslations } from "next-intl/server";

const OrderDetailDialog = async ({
  bookingId,
  current_page,
}: {
  bookingId: string;
  current_page: number;
}) => {
  if (!bookingId || isNaN(parseInt(bookingId, 10))) {
    redirect("/my-account/order-history");
  }
  const t = await getTranslations("order-history");
  const bookingDetail = await getBookingDetail(parseInt(bookingId, 10));

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        redirect(`/my-account/order-history?page=${current_page}`);
      }}
    >
      <DialogContent className="flex h-full flex-col px-0 pb-24 focus:outline-none sm:w-full md:max-w-[600px] md:pb-0">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-center">
            {t("booking-details")}
          </DialogTitle>
        </DialogHeader>
        {bookingDetail && (
          <div className="flex-grow overflow-y-auto px-4">
            <div className="mb-4 rounded-lg bg-gradient-to-b from-[#8664E2] to-[#6558CD] p-4 text-white">
              <h3 className="font-semibold">
                {bookingDetail.room_booking_details[0].room_name}
              </h3>
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
                  {bookingDetail.room_booking_details[0].check_in}
                </p>
              </div>
              <div>
                <p className="font-semibold">Check-out</p>
                <p className="text-sm font-semibold text-primary">
                  {bookingDetail.room_booking_details[0].check_out}
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
                <p className="text-2xl font-bold">USD ...</p>
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
  );
};

export default OrderDetailDialog;

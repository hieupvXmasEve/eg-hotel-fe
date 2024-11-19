"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Rating from "@/features/rooms/components/rating";
import { Baby, Bed, Users } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookingDetail } from "../data/get-booking-detail";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { convertNameToUrl } from "@/features/hotels/utils/convert-name-to-url";
import { addDays, format } from "date-fns";

interface OrderDetailContentProps {
  bookingDetail: BookingDetail;
  current_page: number;
}
export default function OrderDetailContent({
  bookingDetail,
  current_page,
}: OrderDetailContentProps) {
  const router = useRouter();
  const t = useTranslations("order-history");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const closeModal = () => {
    router.replace(
      {
        pathname: "/my-account/order-history",
        query: { page: current_page },
      },
      {
        scroll: false,
      },
    );
  };
  const roomDetail = bookingDetail.room_booking_details![0];
  return (
    <>
      <div
        className="fixed inset-0 cursor-default bg-black opacity-25"
        onClick={closeModal}
      />
      <div className="relative h-full w-full max-w-3xl rounded-md bg-white shadow-md md:h-[90vh]">
        <div className="sticky top-0 flex items-start justify-between border-b bg-white md:rounded-t-lg">
          <h3 className="p-4 text-lg font-semibold">{t("order-detail")}</h3>
          <div
            onClick={closeModal}
            className="absolute right-4 top-4 flex items-center justify-center rounded pb-0.5"
          >
            <Cross2Icon className="size-4" />
            <span className="sr-only">{t("close-modal")}</span>
          </div>
        </div>
        <ScrollArea className="max-h-[calc(90vh-4rem)] overflow-y-auto px-4 pt-4">
          {bookingDetail && (
            <div className="flex-grow overflow-y-auto px-4">
              <div className="mb-4 rounded-lg bg-gradient-to-b from-[#8664E2] to-[#6558CD] p-4 text-white">
                <h3 className="font-semibold">{roomDetail!.room_name}</h3>
                <div className="flex items-center">
                  <Rating value={4.5} />
                  <span className="ml-2 text-sm">
                    {bookingDetail.hotel_point.toFixed(1)}/10
                  </span>
                </div>
                {/* <p className="mt-1 text-sm">
                  Comfortable hotel with a full-service spa and airport shuttle
                  service
                </p> */}
              </div>
              <Separator className="my-4" />
              <p className="mb-4 text-sm text-gray-500">
                {bookingDetail.hotel_address}
              </p>
              <Separator className="my-4" />
              <div className="mb-4 grid grid-cols-2">
                <div>
                  <p className="font-semibold">{t("check-in")}</p>
                  <p className="text-sm font-semibold text-primary">
                    {roomDetail!.check_in}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">{t("check-out")}</p>
                  <p className="text-sm font-semibold text-primary">
                    {roomDetail!.check_out}
                  </p>
                </div>
              </div>

              <p className="mb-2 font-semibold">
                {t("number-of-room-and-guest")}
              </p>
              <p className="text-sm font-semibold text-primary">
                {`${bookingDetail.room_quantity} ${bookingDetail.room_quantity > 1 ? t("rooms") : t("room")},
                  ${bookingDetail.total_adults} ${bookingDetail.total_adults > 1 ? t("adults") : t("adult")},
                  ${bookingDetail.total_children} ${bookingDetail.total_children > 1 ? t("children") : t("children")}
                  `}
              </p>
              <Separator className="my-4" />
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{t("total-price")}</p>
                  <p className="text-2xl font-bold">
                    USD {bookingDetail.total_price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{t("taxes-and-fees")}</p>
                  <p className="text-sm font-bold">USD 0.00</p>
                </div>

                {/* <p className="text-sm text-gray-500">
                  Pay at the check-in counter
                </p> */}
              </div>
              <div className="my-4">
                <div className="rounded-xl border p-4">
                  <p className="font-semibold">{roomDetail!.room_name}</p>
                  <div className="mt-2 flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>
                      {roomDetail!.adult}{" "}
                      {roomDetail!.adult > 1 ? t("adults") : t("adult")}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm">
                    <Baby className="mr-2 h-4 w-4" />
                    <span>
                      {roomDetail!.children}{" "}
                      {roomDetail!.children > 1
                        ? t("childrens")
                        : t("children")}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm">
                    <Bed className="mr-2 h-4 w-4" />
                    <span>
                      {roomDetail!.bed_quantity}{" "}
                      {roomDetail!.bed_quantity > 1 ? t("beds") : t("bed")}
                    </span>
                  </div>
                </div>
                <Link
                  href={{
                    pathname: "/[hotelName]/[roomName]",
                    params: {
                      hotelName: bookingDetail.hotel_name,
                      roomName: convertNameToUrl(roomDetail!.room_type_name),
                    },
                    query: {
                      room_id: roomDetail!.room_id,
                      hotel_id: bookingDetail.hotel_id,
                      date_from: format(new Date(), "yyyy-MM-dd"),
                      date_to: format(addDays(new Date(), 1), "yyyy-MM-dd"),
                    },
                  }}
                  className="block"
                >
                  <Button variant="link" className="mt-2 p-0">
                    See room detail
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
}

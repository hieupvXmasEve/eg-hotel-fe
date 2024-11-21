import { getBookingDetail } from "../data/get-booking-detail";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import OrderDetailContent from "./order-detail-content";

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
  const bookingDetail = await getBookingDetail(parseInt(bookingId, 10));
  return (
    <Card className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden border-none bg-transparent">
      <OrderDetailContent
        current_page={current_page}
        bookingDetail={bookingDetail}
      />
    </Card>
  );
};

export default OrderDetailDialog;

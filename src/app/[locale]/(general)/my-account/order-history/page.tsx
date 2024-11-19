import { Suspense } from "react";
import ListOrder from "@/features/orders/components/list-order";
import { getOrders } from "@/features/orders/data/use-get-orders";
import { getTranslations } from "next-intl/server";
import OrderHistorySkeleton from "@/features/orders/components/order-history-skeleton";
import ListOrderPagination from "@/features/orders/components/list-order-pagination";
import OrderCard from "@/features/orders/components/order-card";
import OrderDetailDialog from "@/features/orders/components/order-detail-dialog";

export default async function OrderHistoryPage({
  searchParams,
}: {
  searchParams: { page: string; modal: string; bookingid: string };
}) {
  const t = await getTranslations("order-history");
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const showModal = searchParams?.modal === "true";
  const bookingId = searchParams?.bookingid;
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
      <Suspense fallback={<OrderHistorySkeleton />}>
        <OrderList page={page} showModal={showModal} bookingId={bookingId} />
      </Suspense>
    </div>
  );
}

async function OrderList({
  page,
  showModal,
  bookingId,
}: {
  page: number;
  showModal: boolean;
  bookingId: string;
}) {
  const { booking_history, total_page } = await getOrders({
    page,
  });
  const t = await getTranslations("order-history");
  if (booking_history.length === 0)
    return (
      <div className="flex flex-1 items-center justify-center">
        {t("no-data")}
      </div>
    );
  return (
    <>
      {booking_history?.map((booking) => (
        <OrderCard
          key={booking.booking_id}
          current_page={page}
          booking={booking}
          t={t}
        />
      ))}
      <ListOrderPagination current_page={page} total_page={total_page} />
      {showModal && (
        <Suspense key={bookingId}>
          <OrderDetailDialog bookingId={bookingId} />
        </Suspense>
      )}
    </>
  );
}

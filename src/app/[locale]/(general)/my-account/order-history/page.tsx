import { Suspense } from "react";
import ListOrder from "@/features/orders/components/list-order";
import { getOrders } from "@/features/orders/data/use-get-orders";
import { getTranslations } from "next-intl/server";
import OrderHistorySkeleton from "@/features/orders/components/order-history-skeleton";

export default async function OrderHistoryPage() {
  const t = await getTranslations("order-history");

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
      <Suspense fallback={<OrderHistorySkeleton />}>
        <OrderList />
      </Suspense>
    </>
  );
}

async function OrderList() {
  const data = await getOrders();
  return <ListOrder data={data} />;
}

import ApiClient from "@/lib/client";

const api = new ApiClient("en", "usd");

export interface OrderHistory {
  booking_id: number;
  room_image: string;
  room_name: string;
  address: string;
  check_in: string;
  check_out: string;
  total_price: number;
  payment_status: number;
}
interface OrderHistoryResponse {
  success: boolean;
  data: {
    booking_history: OrderHistory[];
    total_record: number;
    total_page: number;
  };
  status: string;
}
export async function getOrders({ page }: { page: number }): Promise<{
  booking_history: OrderHistory[];
  total_record: number;
  total_page: number;
}> {
  const response = await api.fetch<OrderHistoryResponse>(
    "/api/booking/history",
    {
      method: "POST",
      data: {
        pageNumb: page,
        pageSize: 5,
        sorts: [
          {
            field: "booking_id",
            isDesc: true,
          },
        ],
      },
    },
  );
  return response.data;
}

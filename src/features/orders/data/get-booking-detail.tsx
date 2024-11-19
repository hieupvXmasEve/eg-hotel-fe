import ApiClient from "@/lib/client";

const api = new ApiClient("en", "usd");

export interface RoomBookingDetail {
  room_id: number;
  room_name: string;
  adult: number;
  children: number;
  bed_quantity: number;
  room_description: string;
  image: string;
  room_type_id: number;
  room_type_name: string;
  check_in: string;
  check_out: string;
}
export interface BookingDetail {
  hotel_id: number;
  hotel_name: string;
  hotel_point: number;
  hotel_address: string;
  room_quantity: number;
  total_adults: number;
  total_children: number;
  payment_status: number;
  total_price: number;
  checkin_person_info: null | string; // You can replace 'any' with a more specific type if needed
  room_booking_details: RoomBookingDetail[];
}
interface BookingDetailResponse {
  success: boolean;
  data: BookingDetail;
  status: string;
}
export async function getBookingDetail(
  bookingId: number,
): Promise<BookingDetail> {
  const response = await api.fetch<BookingDetailResponse>(
    `/api/booking/get/${bookingId}`,
  );
  return response.data;
}

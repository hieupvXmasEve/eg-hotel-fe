import ApiClient from "@/lib/client";
const api = new ApiClient();
export interface RoomDetail {
  room_id: number;
  room_name: string;
  room_type_id: number;
  room_type_name: string;
  hotel_id: number;
  hotel_name: string;
  address: string;
  room_description: string | null;
  member_price: number;
  non_member_price: number;
  adults: number;
  children: number | null;
  stars: number | null;
  bed_number: number;
  bed_type_id: number;
  bed_type_name: string;
  hotel_policies: string;
  refund_policies: string;
  quantity_room: number;
  longitude: number;
  latitude: number;
  check_in: string;
  check_out: string;
  rate: number | null;
  room_images: [];
  room_facilities: [];
}
export interface RoomDetailResponse {
  success: boolean;
  data: RoomDetail;
}
export async function getRoomDetail(roomId: string) {
  const response = await api.fetch<RoomDetailResponse>(`/api/room/${roomId}`);
  return response;
}

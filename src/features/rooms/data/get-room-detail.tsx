import ApiClient from "@/lib/client";
const api = new ApiClient();
interface RoomImage {
  image_url: string;
}

export interface RoomFacility {
  facility_id: number;
  facility_type: number;
  facility_name: string;
  facility_type_name: string;
  facility_image: string | null;
}

export interface HotelService {
  service_id: number;
  service_name: string;
}

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
  quantity_room: number;
  longitude: number;
  latitude: number;
  check_in: string;
  check_out: string;
  room_images: RoomImage[];
  room_facilities: RoomFacility[];
  hotel_services: HotelService[];
  room_policies: string;
  room_refund_policies: string;
  review_point: number | null;
  review_count: number;
  accessibility: string;
  common_areas: string;
  room_notes: string;
  check_in_notes: string;
  check_out_notes: string;
  special_check_in_instructions: string;
  access_methods: string;
  pets: string;
  children_and_extra_beds: string;
}
export interface RoomDetailResponse {
  success: boolean;
  data: RoomDetail;
}
export async function getRoomDetail(roomId: string) {
  const response = await api.fetch<RoomDetailResponse>(`/api/room/${roomId}`);
  return response;
}

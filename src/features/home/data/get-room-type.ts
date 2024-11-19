import ApiClient from "@/lib/client";

const api = new ApiClient("en", "usd");

export interface RoomType {
  room_type_id: number;
  room_type_name: string;
  room_image: Array<{ image_url?: string }>;
  description: string;
}
interface RoomTypeResponse {
  success: boolean;
  data: RoomType[];
  status: string;
}
export async function getRoomType() {
  const response = await api.fetch<RoomTypeResponse>("/api/room/roomtype");
  return response.data;
}

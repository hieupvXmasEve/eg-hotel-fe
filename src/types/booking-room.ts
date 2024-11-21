import { RoomDetail } from "@/features/rooms/data/get-room-detail";

export interface BookingRoom {
  roomDetail: RoomDetail;
  dateFrom: string;
  dateTo: string;
  quantity: number;
}

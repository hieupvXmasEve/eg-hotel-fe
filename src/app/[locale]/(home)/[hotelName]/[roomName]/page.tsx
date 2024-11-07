import RoomDetailComponent from "@/features/rooms/components/room-detail";
import { getRoomDetail } from "@/features/rooms/data/get-room-detail";
import { notFound } from "next/navigation";

export default async function RoomDetailPage({
  searchParams,
}: {
  searchParams: { room_id: string; date_from: string; date_to: string };
}) {
  const { data, success } = await getRoomDetail(searchParams.room_id);
  if (!success) return notFound();

  return (
    <RoomDetailComponent
      data={data}
      date_from={searchParams.date_from}
      date_to={searchParams.date_to}
    />
  );
}

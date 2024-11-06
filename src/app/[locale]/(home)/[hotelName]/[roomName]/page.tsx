import RoomDetailComponent from "@/features/rooms/components/room-detail";
import { getRoomDetail } from "@/features/rooms/data/get-room-detail";
export default async function RoomDetailPage({
  searchParams,
}: {
  searchParams: { room_id: string };
}) {
  const { data, success } = await getRoomDetail(searchParams.room_id);
  if (!success) return <div>Error</div>;
  return (
    <>
      <RoomDetailComponent data={data} />
    </>
  );
}

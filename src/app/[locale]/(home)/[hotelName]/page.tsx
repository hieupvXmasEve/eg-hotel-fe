import { RoomSkeleton } from "@/features/hotels/components/room";
import RoomList from "@/features/hotels/components/room-list";
import { Suspense } from "react";

export default function HotelPage({
  params,
  searchParams,
}: {
  params: { hotelName: string };
  searchParams: {
    date_from: string;
    date_to: string;
    rooms: string;
    hotel_id: string;
    timestamp?: string;
  };
}) {
  return (
    <Suspense fallback={<RoomSkeleton />}>
      <RoomList hotelName={params.hotelName} searchParams={searchParams} />
    </Suspense>
  );
}

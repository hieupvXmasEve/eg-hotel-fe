"use client";
import { useGetRooms } from "@/features/hotels/data/use-get-rooms";
import Room from "@/features/hotels/components/room";
import { convertQueryStringToJson, Result } from "@/lib/utils";

export default function HotelPage({
  params,
  searchParams,
}: {
  params: { hotelName: string };
  searchParams: {
    date_to: string;
    rooms: string;
  };
}) {
  let occupanciesRoom: Result = [];
  occupanciesRoom = convertQueryStringToJson(searchParams.rooms);
  console.log("occupanciesRoom", occupanciesRoom, params);
  const { data, isLoading } = useGetRooms({ hotelId: params.hotelName });

  if (isLoading) return <Room.Skeleton />;
  if (!data) return <div>No data</div>;
  return (
    <div className="space-y-3">
      {data.map((room) => (
        <Room key={room.room_id} room={room} />
      ))}
    </div>
  );
}

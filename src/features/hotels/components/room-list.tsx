import { convertQueryStringToJson } from "@/lib/utils";
import { Occupancy, searchRoom } from "../data/search-room";
import Room from "./room";
import { notFound } from "next/navigation";

interface RoomListProps {
  hotelName: string;
  searchParams: {
    date_from: string;
    date_to: string;
    rooms: string;
    hotel_id: string;
    timestamp?: string;
  };
}

export default async function RoomList({
  hotelName,
  searchParams,
}: RoomListProps) {
  let occupanciesRoom: Occupancy[] = [];
  occupanciesRoom = convertQueryStringToJson(searchParams.rooms);

  if (!searchParams.hotel_id) return notFound();

  const data = await searchRoom({
    dataBody: {
      hotelid: searchParams.hotel_id,
      checkintime: searchParams.date_from,
      checkouttime: searchParams.date_to,
      occupancy: occupanciesRoom,
    },
  });
  if (!data.data?.length) return <div className="text-center">No data</div>;

  return (
    <div className="space-y-3">
      {data.data.map((room) => (
        <Room
          key={room.room_id}
          room={room}
          hotelName={hotelName}
          hotelId={searchParams.hotel_id}
          date_from={searchParams.date_from}
          date_to={searchParams.date_to}
        />
      ))}
    </div>
  );
}

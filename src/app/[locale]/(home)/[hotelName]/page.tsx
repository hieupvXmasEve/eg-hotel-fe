"use client";
import { useGetRooms } from "@/features/hotels/api/use-get-rooms";
import Room from "@/features/hotels/components/room";
import { convertQueryStringToJson, Result } from "@/lib/utils";

// const rooms = [
//   {
//     id: 1,
//     image: "/images/rooms/demo.jpg",
//     name: "Deluxe Room",
//     price: 100,
//     address: "123 Main St, New York, NY 10001",
//     hotelNameUrl: "eg-hotel",
//     roomNameUrl: "deluxe-room",
//   },
//   {
//     id: 2,
//     image: "/images/rooms/demo.jpg",
//     name: "Superior Room",
//     price: 150,
//     address: "456 Main St, New York, NY 10001",
//     hotelNameUrl: "eg-hotel",
//     roomNameUrl: "superior-room",
//   },
// ];
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

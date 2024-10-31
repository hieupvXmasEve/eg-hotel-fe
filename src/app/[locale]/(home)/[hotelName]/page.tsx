import Room from "@/features/hotels/components/room";
import { Occupancy, searchRoom } from "@/features/hotels/data/search-room";
import { convertQueryStringToJson } from "@/lib/utils";

export default async function HotelPage({
  params,
  searchParams,
}: {
  params: { hotelName: string };
  searchParams: {
    date_from: string;
    date_to: string;
    rooms: string;
    hotel_id: string;
  };
}) {
  let occupanciesRoom: Occupancy[] = [];
  occupanciesRoom = convertQueryStringToJson(searchParams.rooms);
  console.log("occupanciesRoom", occupanciesRoom, params);
  console.log("searchParams.hotel_id", searchParams);
  const data = await searchRoom({
    dataBody: {
      hotelid: searchParams.hotel_id,
      checkintime: searchParams.date_from,
      checkouttime: searchParams.date_to,
      occupancy: occupanciesRoom,
    },
  });

  console.log("data", data);
  const isLoading = false;

  if (isLoading) return <Room.Skeleton />;
  if (!data.data?.length) return <div>No data</div>;
  return (
    <div className="space-y-3">
      {data.data.map((room) => (
        <Room key={room.roomId} room={room} hotelName={params.hotelName} />
      ))}
    </div>
  );
}

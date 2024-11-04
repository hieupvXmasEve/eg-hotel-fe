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
  const data = await searchRoom({
    dataBody: {
      hotelid: searchParams.hotel_id,
      checkintime: searchParams.date_from,
      checkouttime: searchParams.date_to,
      occupancy: occupanciesRoom,
    },
  });

  const isLoading = false;

  if (isLoading) return <Room.Skeleton />;
  if (!data.data?.length) return <div className="text-center">No data</div>;
  return (
    <div className="space-y-3">
      {data.data.map((room) => (
        <Room key={room.room_id} room={room} hotelName={params.hotelName} />
      ))}
    </div>
  );
}

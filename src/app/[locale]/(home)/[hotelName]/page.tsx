import Room from "../components/room";

const rooms = [
  {
    id: 1,
    image: "/images/rooms/demo.jpg",
    name: "Deluxe Room",
    price: 100,
    address: "123 Main St, New York, NY 10001",
    hotelNameUrl: "/eg-hotel",
    roomNameUrl: "/deluxe-room",
  },
  {
    id: 2,
    image: "/images/rooms/demo.jpg",
    name: "Superior Room",
    price: 150,
    address: "456 Main St, New York, NY 10001",
    hotelNameUrl: "/eg-hotel",
    roomNameUrl: "/superior-room",
  },
];
export default function HotelPage({
  params,
}: {
  params: { hotelName: string };
}) {
  console.log("params", params.hotelName);

  return (
    <div className="space-y-3">
      {rooms.map((room) => (
        <Room key={room.id} room={room} />
      ))}
    </div>
  );
}

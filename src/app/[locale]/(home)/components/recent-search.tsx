import { Link } from "@/i18n/routing";
import Image from "next/image";

interface Room {
  id: number;
  name: string;
  image: string;
  dateRange: string;
  people: number;
}

export default function Component() {
  const rooms: Room[] = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      image: "/images/rooms/placeholder.svg",
      dateRange: "18/10 - 20/10",
      people: 2,
    },
    {
      id: 2,
      name: "Mountain Retreat Suite",
      image: "/images/rooms/placeholder.svg",
      dateRange: "18/10 - 20/10",
      people: 3,
    },
  ];

  if (rooms.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto my-6 w-full">
      <h2 className="mb-4 text-lg font-semibold text-slate-600">
        Your recent searches
      </h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <Link href="#" key={room.id} className="block">
            <div
              key={room.id}
              className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md"
            >
              <Image
                src={room.image}
                alt={`${room.name} image`}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="text-gray-500">
                  {room.dateRange}, {room.people} people
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

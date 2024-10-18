import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Room {
  id: number;
  name: string;
  image: string;
  dateRange: string;
  people: number;
}

export default function Component() {
  const t = useTranslations("home");
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
    {
      id: 3,
      name: "Deluxe Ocean View",
      image: "/images/rooms/placeholder.svg",
      dateRange: "18/10 - 20/10",
      people: 2,
    },
  ];

  if (rooms.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto my-6 w-full">
      <h2 className="mb-2 text-lg font-semibold text-slate-600">
        {t("title-recent-search")}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {rooms.map((room) => (
          <Link href="#" key={room.id} className="block">
            <Card key={room.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div
                  key={room.id}
                  className="flex items-center space-x-4 rounded-lg bg-white"
                >
                  <Image
                    src={room.image}
                    alt={`${room.name} image`}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <p className="text-gray-500">
                      {room.dateRange}, {room.people} {t("search-form.adult")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function RecommendRoom() {
  const t = useTranslations("home");
  const roomsRecommend = [
    {
      id: 1,
      image: "/images/room-type-1.jpg",
      name: "Deluxe Room",
      price: 100,
      address: "Cambodia",
    },
    {
      id: 2,
      image: "/images/room-type-2.jpg",
      name: "Deluxe Room",
      price: 100,
      address: "Cambodia",
    },
  ];
  return (
    <section className="my-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-600">
        {t("title-recommend-room")}
      </h3>
      <div className="space-y-3">
        {roomsRecommend.map((room) => (
          <Link href="#" key={room.id} className="block">
            <div
              key={room.id}
              className="flex items-center space-x-4 rounded-lg bg-white p-1 shadow-md"
            >
              <Image
                src={room.image}
                alt={`${room.name} image`}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p className="text-gray-500">{room.address}</p>
                <div className="flex items-center gap-2 text-xs">
                  <Badge
                    variant="default"
                    className="rounded-sm bg-primary px-1 font-medium"
                  >
                    8.6/20
                  </Badge>
                  <span className="text-slate-500">Very good</span>
                  <span className="text-slate-500">(123 reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Starting from</span>
                  <span className="text-xl font-semibold">${room.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

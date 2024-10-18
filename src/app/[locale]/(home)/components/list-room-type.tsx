import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ListRoomType() {
  const t = useTranslations("home");
  const roomTypes = [
    {
      image: "/images/room-type-1.jpg",
      title: "Deluxe Room",
      description: "Luxurious rooms with stunning city views",
    },
    {
      image: "/images/room-type-2.jpg",
      title: "Superior Room",
      description: "Spacious rooms with modern amenities",
    },
    {
      image: "/images/room-type-3.jpg",
      title: "Suite",
      description: "Luxurious rooms with stunning city views",
    },
    {
      image: "/images/room-type-4.jpg",
      title: "Villa",
      description: "Luxurious rooms with stunning city views",
    },
    {
      image: "/images/room-type-5.jpg",
      title: "Villa Luxury",
      description: "Luxurious rooms with stunning city views",
    },
  ];
  return (
    <section className="my-6">
      <h3 className="mb-2 text-lg font-semibold text-slate-600">
        {t("title-room-type")}
      </h3>
      <div className="xs:gap-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
        {roomTypes.map((roomType) => (
          <div
            key={roomType.title}
            className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative h-40 w-full">
              <Image
                src={roomType.image}
                alt={roomType.title}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 p-3 text-white">
              <h3 className="text-xl font-semibold">{roomType.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

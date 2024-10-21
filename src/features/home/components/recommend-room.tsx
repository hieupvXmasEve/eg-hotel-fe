import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
    {
      id: 3,
      image: "/images/room-type-3.jpg",
      name: "Deluxe Room",
      price: 100,
      address: "Cambodia",
    },
    {
      id: 4,
      image: "/images/room-type-4.jpg",
      name: "Deluxe Room",
      price: 100,
      address: "Cambodia",
    },
    {
      id: 5,
      image: "/images/room-type-5.jpg",
      name: "Deluxe Room",
      price: 100,
      address: "Cambodia",
    },
    {
      id: 6,
      image: "/images/room-type-1.jpg",
      name: "Deluxe Room",
      price: 100,
      address: "Cambodia",
    },
  ];
  return (
    <section className="my-6">
      <h3 className="mb-2 text-lg font-semibold text-slate-600">
        {t("title-recommend-room")}
      </h3>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent>
          {roomsRecommend.map((room) => (
            <CarouselItem
              key={room.id}
              className="w-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
            >
              <Link href="#" key={room.id} className="block">
                <Card key={room.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex h-full flex-col">
                      <div className="relative h-48 w-full">
                        <Image
                          src={room.image}
                          alt={room.name}
                          width={300}
                          height={200}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="p-3">
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
                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            Starting from
                          </span>
                          <span className="text-xl font-semibold">
                            ${room.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import Image from "next/image";

const carouselItems = [
  {
    image: "/images/hotel-carousel-1.jpg",
    title:
      "Comfortable hotel with a full-service spa and airport shuttle service",
    alt: "Cityscape with historic architecture",
  },
  {
    image: "/images/hotel-carousel-1.jpg",
    title: "Luxurious rooms with stunning city views",
    alt: "Hotel room interior",
  },
  {
    image: "/images/hotel-carousel-1.jpg",
    title: "Fine dining restaurant and rooftop bar",
    alt: "Restaurant interior",
  },
];

export default function HotelCarousel() {
  const t = useTranslations("home");
  return (
    <section className="my-6 w-full overflow-hidden">
      <h3 className="mb-4 text-lg font-semibold text-slate-600">
        {t("title-hotel-carousel")}
      </h3>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden rounded-2xl">
                <CardContent className="flex aspect-auto items-center justify-center p-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={300}
                    height={200}
                    className="h-auto w-full"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </section>
  );
}

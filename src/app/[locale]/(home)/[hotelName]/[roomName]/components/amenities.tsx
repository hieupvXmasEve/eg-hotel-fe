import { ParkingIcon, PoolIcon, SpaIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Baby, Bus, Martini, Wifi } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Amenities() {
  const t = useTranslations("room.amenities");
  const amenities = [
    { icon: <Bus />, title: "Free airport shuttle" },
    { icon: <Martini />, title: "Bar" },
    { icon: <PoolIcon />, title: "Outdoor pool" },
    { icon: <SpaIcon />, title: "Spa" },
    { icon: <Wifi />, title: "Free WiFi" },
    { icon: <ParkingIcon />, title: "Free parking" },
  ];
  const topFamilyAmenities = [
    { icon: <Baby />, title: "Kids club" },
    { icon: <PoolIcon />, title: "Kids pool" },
    { icon: <PoolIcon />, title: "Babysitting" },
    { icon: <PoolIcon />, title: "Extra beds/cribs" },
  ];
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">{t("title")}</h3>
      <div className="flex flex-wrap gap-y-4 md:gap-x-10">
        {amenities.map((amenity) => (
          <div
            key={amenity.title}
            className="flex basis-1/2 md:basis-1/3 md:gap-3"
          >
            {amenity.icon}
            <p>{amenity.title}</p>
          </div>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="mt-4 px-0 focus-visible:ring-0">
            {t("btn-see-all")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("amenity-title")}</DialogTitle>
          </DialogHeader>
          <div className="grid py-4">
            <div>
              <h4 className="text-lg font-bold">
                Top family-friendly amenities
              </h4>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {topFamilyAmenities.map((amenity) => (
                  <li key={amenity.title} className="flex items-center gap-2">
                    {amenity.icon}
                    <span>{amenity.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

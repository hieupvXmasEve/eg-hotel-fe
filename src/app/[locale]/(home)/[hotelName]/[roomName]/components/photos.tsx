import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Photos() {
  const photos = [
    "/images/rooms/room-detail.webp",
    "/images/rooms/room-detail.webp",
    "/images/rooms/room-detail.webp",
    "/images/rooms/room-detail.webp",
    "/images/rooms/room-detail.webp",
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-1">
      {photos.map((photo, index) => (
        <figure
          className={cn(
            "relative aspect-video",
            index === 0 ? "col-span-2 row-span-2" : "",
          )}
          key={index}
        >
          <Image
            src={photo}
            alt="room"
            fill
            objectFit="cover"
            className="rounded-lg"
          />
        </figure>
      ))}
    </div>
  );
}

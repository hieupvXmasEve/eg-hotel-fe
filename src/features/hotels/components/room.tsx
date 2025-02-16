import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { IRoom } from "../data/search-room";
import { convertNameToUrl } from "../utils/convert-name-to-url";
import { useTranslations } from "next-intl";

interface RoomProps {
  room: IRoom;
  hotelName: string;
  hotelId: string;
  date_from: string;
  date_to: string;
}

export default function Room({
  room,
  hotelName,
  hotelId,
  date_from,
  date_to,
}: RoomProps) {
  const t = useTranslations("room");
  return (
    <Link
      href={{
        pathname: "/[hotelName]/[roomName]",
        params: {
          hotelName: hotelName,
          roomName: convertNameToUrl(room.room_type_name),
        },
        query: {
          room_id: room.room_id,
          hotel_id: hotelId,
          date_from: date_from,
          date_to: date_to,
        },
      }}
      key={room.room_id}
      className="block"
    >
      <div className="flex h-32 rounded-lg bg-white shadow-md sm:h-36">
        <div className="relative w-28 sm:w-48">
          {room.room_images &&
          room.room_images.length > 0 &&
          room.room_images?.[0] ? (
            <Image
              key={room.room_images[0].image_url}
              src={room.room_images[0].image_url}
              alt={`${room.room_type_name} image`}
              className="h-full rounded-lg object-cover object-center"
              width={300}
              height={200}
              unoptimized
            />
          ) : (
            <div className="h-full w-full bg-secondary"></div>
          )}
        </div>
        <div className="flex h-full flex-1 flex-col justify-between p-2">
          <div>
            <h3 className="text-lg font-semibold">{room.room_type_name}</h3>
            {/* <p className="text-sm text-slate-500">{room.address}</p> */}
            <Image
              src="/images/rooms/pool-icon.svg"
              alt="pool"
              width={15}
              height={14}
            />
          </div>
          <div className="flex items-center justify-between gap-1 text-xs md:flex-row">
            <div className="flex items-center gap-2">
              <Badge
                variant="default"
                className="rounded-sm bg-primary px-1 font-medium"
              >
                8.6/20
              </Badge>
              <span className="text-slate-500">Very good</span>
              <span className="text-slate-500">
                ({room.review || 0} {t("reviews")})
              </span>
            </div>
            <span className="text-xl font-semibold">${room.base_price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export function RoomSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[144px] w-full rounded-lg bg-secondary" />
      <Skeleton className="h-[144px] w-full rounded-lg bg-secondary" />
      <Skeleton className="h-[144px] w-full rounded-lg bg-secondary" />
      <Skeleton className="h-[144px] w-full rounded-lg bg-secondary" />
    </div>
  );
}

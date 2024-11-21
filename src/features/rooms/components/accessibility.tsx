import { DoorOpen, Hotel } from "lucide-react";
import { useTranslations } from "next-intl";
import { RoomDetail } from "../data/get-room-detail";

export default function Accessibility({ data }: { data: RoomDetail }) {
  const t = useTranslations("room.accessibility");
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">{t("title")}</h3>
        <p className="text-sm text-gray-500">{data.accessibility}</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Hotel className="size-5" />
          <h4 className="text-lg">{t("common-areas")}</h4>
        </div>
        <ul className="text-gray-500">{data.common_areas}</ul>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <DoorOpen className="size-5" />
          <h4 className="text-lg">{t("rooms")}</h4>
        </div>
        <ul className="text-gray-500">
          {data.room_facilities?.map((facility) => (
            <li key={facility.facility_id}>{facility.facility_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

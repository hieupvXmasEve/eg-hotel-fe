import { DoorOpen, Hotel } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Accessibility() {
  const t = useTranslations("room.accessibility");
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">{t("title")}</h3>
        <p className="text-sm text-gray-500">
          If you have requests for specific accessibility needs, please contact
          the property using the information on the reservation confirmation
          received after booking.
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Hotel className="size-5" />
          <h4 className="text-lg">{t("common-areas")}</h4>
        </div>
        <ul className="text-gray-500">
          <li>Wheelchair accessible (may have limitations)</li>
          <li>Elevator/Lift</li>
          <li>Non-smoking floor</li>
          <li>Accessible room</li>
        </ul>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <DoorOpen className="size-5" />
          <h4 className="text-lg">{t("rooms")}</h4>
        </div>
        <ul className="text-gray-500">
          <li>Wheelchair accessibility </li>
          <li>Accessible bathroom</li>
          <li>Accessible room</li>
        </ul>
      </div>
    </div>
  );
}

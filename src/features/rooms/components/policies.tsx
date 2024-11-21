import { useTranslations } from "next-intl";
import { RoomDetail } from "../data/get-room-detail";

export default function Policies({ data }: { data: RoomDetail }) {
  const t = useTranslations("room.policies");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <h3 className="text-lg font-bold">{t("title")}</h3>
      <div className="col-span-2 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-lg">{t("check-in")}</h4>
            {/* <ul className="space-y-1 text-sm text-gray-500"></ul> */}
            <p className="text-gray-500">{data.check_in_notes}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg">{t("check-out")}</h4>
            <p className="text-gray-500">{data.check_out_notes}</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg">{t("special-check-in-instructions")}</h4>
          <p className="text-gray-500">{data.special_check_in_instructions}</p>
        </div>

        <div>
          <h4 className="text-lg">{t("access-methods")}</h4>
          <p className="text-gray-500">{data.access_methods}</p>
        </div>

        <div>
          <h4 className="text-lg">{t("pets")}</h4>
          <p className="text-gray-500">{data.pets}</p>
        </div>

        <div>
          <h4 className="text-lg">{t("children-and-extra-beds")}</h4>
          <p className="text-gray-500">{data.children_and_extra_beds}</p>
        </div>
      </div>
    </div>
  );
}

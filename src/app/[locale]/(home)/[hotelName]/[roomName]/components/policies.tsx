import { useTranslations } from "next-intl";

export default function Policies() {
  const t = useTranslations("room.policies");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <h3 className="text-lg font-bold">{t("title")}</h3>
      <div className="col-span-2 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-lg">{t("check-in")}</h4>
            <ul className="space-y-1 text-sm text-gray-500">
              <li>Check-in start time: 2:00 PM; Check-in end time: 5:00 AM</li>
              <li>Early check-in subject to availability</li>
              <li>Early check-in is available for a fee</li>
              <li>Contactless check-in available</li>
              <li>Minimum check-in age: 18</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg">{t("check-out")}</h4>
            <ul className="space-y-1 text-sm text-gray-500">
              <li>Check-out before noon</li>
              <li>Contactless check-out available</li>
              <li>Late check-out subject to availability</li>
              <li>A late check-out fee will be charged</li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-lg">{t("special-check-in-instructions")}</h4>
          <ul className="space-y-1 text-sm text-gray-500">
            <li>Front desk staff will greet guests on arrival</li>
            <li>This property doesn&apos;t offer after-hours check-in</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg">{t("access-methods")}</h4>
          <ul className="space-y-1 text-sm text-gray-500">
            <li>Staffed front desk</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg">{t("pets")}</h4>
          <ul className="space-y-1 text-sm text-gray-500">
            <li>Pets not allowed</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg">{t("children-and-extra-beds")}</h4>
          <ul className="space-y-1 text-sm text-gray-500">
            <li>Children are welcome</li>
            <li>
              1 child, up to the age of 3 years, can stay for free if using
              existing beds when occupying the parent or guardian&apos;s room
            </li>
            <li>Rollaway/extra beds are available for USD 25.0 per night</li>
            <li>Free cribs are available on request at the property</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

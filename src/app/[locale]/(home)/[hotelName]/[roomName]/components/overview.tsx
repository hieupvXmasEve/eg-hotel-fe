import { format } from "date-fns";
import Rating from "./rating";
import { useTranslations } from "next-intl";

export default function Overview() {
  const t = useTranslations("room.overview");
  // fake data room reservation
  const roomReservation = {
    checkIn: new Date("2023-09-01"),
    checkOut: new Date("2023-09-03"),
    price: 59.9,
    dayBooking: 2,
    totalPrice: 119.8,
    adult: 2,
    children: 0,
  };
  return (
    <>
      <h2 className="text-2xl font-bold">
        Room name - EG Paradise Angkor Villa Hotel
      </h2>
      {/* Star rating */}
      <div className="flex items-center gap-2">
        <Rating value={4.5} />
        <span>4.5</span>
      </div>
      {/* Description */}
      <p className="text-sm text-gray-500">
        Comfortable hotel with a full-service spa and airport shuttle service
      </p>
      {/* Information */}
      <h3 className="text-lg font-bold">{t("information")}</h3>
      <div className="mb-4 flex items-center gap-4">
        <div>
          <p className="text-sm">{t("check-in")}</p>
          <p className="font-medium text-primary">
            {format(roomReservation.checkIn, "EEE d MMM")}
          </p>
        </div>
        <div>
          <p className="text-sm">{t("check-out")}</p>
          <p className="font-medium text-primary">
            {format(roomReservation.checkOut, "EEE d MMM")}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p className="mb-1 text-sm">{t("room-and-guest")}</p>
        <p className="font-medium text-primary">{`${roomReservation.dayBooking} ${t("room")}, ${roomReservation.adult} ${t("adult")}, ${roomReservation.children} ${t("children")}`}</p>
      </div>
      <div className="mb-4">
        <p className="mb-1 text-sm">
          {`${t("price-title", { dayBooking: roomReservation.dayBooking })} ${roomReservation.dayBooking > 1 ? t("night-plural") : t("night")}`}
        </p>
        <p className="space-x-2 font-medium">
          <span className="text-lg font-bold">
            USD {roomReservation.totalPrice.toFixed(1)}
          </span>
          <span className="text-sm font-normal">{t("tax-and-fee")}</span>
        </p>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">{t("highlights")}</h3>
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
          <span className="material-icons">
            <svg
              width="22"
              height="34"
              viewBox="0 0 22 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.875 6.875C14.5319 6.875 15.875 5.53185 15.875 3.875C15.875 2.21815 14.5319 0.875 12.875 0.875C11.2181 0.875 9.875 2.21815 9.875 3.875C9.875 5.53185 11.2181 6.875 12.875 6.875Z"
                fill="black"
              />
              <path
                d="M20.4875 15.575L16.625 14.3C16.625 14.3 14.4875 9.35 14.4125 9.2C13.8875 8.2625 12.9125 7.625 11.7875 7.625C11.3375 7.625 10.8875 7.7375 10.5125 7.925L5.26248 9.9875C4.88748 10.1375 4.58748 10.4375 4.43748 10.8125L2.56248 15.3125C2.26248 16.0625 2.59998 16.9625 3.38748 17.2625C3.57498 17.3375 3.76248 17.375 3.94998 17.375C4.54998 17.375 5.11248 17.0375 5.33748 16.4375L6.87498 12.5375L8.44998 11.9375L5.86248 24.575L0.837484 30.6875C0.312484 31.325 0.387484 32.2625 1.02498 32.7875C1.28748 33.0125 1.62498 33.125 1.96248 33.125C2.41248 33.125 2.82498 32.9375 3.12498 32.5625L8.37498 26.1875C8.52498 26 8.63748 25.775 8.67498 25.55L9.57498 21.2L13.625 24.125V31.625C13.625 32.45 14.3 33.125 15.125 33.125C15.95 33.125 16.625 32.45 16.625 31.625V23.375C16.625 22.8875 16.4 22.4375 16.025 22.175L12.3875 19.5125L13.4 14.45L14.1125 16.1C14.3 16.475 14.6 16.775 15.0125 16.925L19.5125 18.425C19.6625 18.4625 19.8125 18.5 20 18.5C20.6375 18.5 21.2 18.0875 21.425 17.4875C21.6875 16.7 21.275 15.8375 20.4875 15.575Z"
                fill="black"
              />
            </svg>
          </span>
          <p>Close to Palm Container Night Market</p>
        </div>
      </div>
    </>
  );
}

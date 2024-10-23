import { useTranslations } from "next-intl";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

export default function MapComponent() {
  const t = useTranslations("room.map");
  // 13.366339065974268, 103.87884199576183
  return (
    <div>
      <h4 className="text-lg font-bold">{t("title")}</h4>

      <div className="aspect-video bg-gray-200">
        <APIProvider
          apiKey={"Your API key here"}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom,
              )
            }
          ></Map>
        </APIProvider>
      </div>
    </div>
  );
}

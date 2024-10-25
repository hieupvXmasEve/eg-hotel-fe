import { useTranslations } from "next-intl";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css"; // See notes below

export default function MapComponent() {
  const t = useTranslations("room.map");
  // 13.366339065974268, 103.87884199576183
  return (
    <div>
      <h4 className="text-lg font-bold">{t("title")}</h4>

      <div className="aspect-square bg-gray-200">
        <Map
          initialViewState={{
            longitude: 103.87884199576183,
            latitude: 13.366339065974268,
            zoom: 17,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://tiles.openfreemap.org/styles/bright"
        />
      </div>
    </div>
  );
}

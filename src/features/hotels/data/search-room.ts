import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

interface RoomImage {
  image_url: string;
}

interface RoomFeature {
  room_feature_id: number;
  room_feature_name: string;
  room_feature_image: string;
  position: number;
}

export interface IRoom {
  room_id: number;
  room_type_id: number;
  room_type_name: string;
  room_images: RoomImage[] | null;
  room_features: RoomFeature[] | null;
  review: string;
  rate: number;
  country_id: number;
  country_name: string | null;
  base_price: number;
}
export interface Occupancy {
  adults: number;
  children: number;
}
export async function searchRoom({
  dataBody,
  lang = "en",
  currency = "usd",
}: {
  lang?: string;
  currency?: string;
  dataBody: {
    hotelid: string;
    checkintime: string;
    checkouttime: string;
    occupancy: Occupancy[];
  };
}) {
  try {
    console.log("dataBody", dataBody);
    const response: AxiosResponse<{
      success: boolean;
      data: {
        rooms: IRoom[];
      };
      message: string;
    }> = await axiosInstance.get("/api/room/search", {
      headers: {
        Language: lang,
        Currency: currency,
        Platform: "web",
      },
      data: dataBody,
    });
    if (!response.data.success) return { error: response.data.message };
    return { success: true, data: response.data.data.rooms };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { error: "Authentication failed" };
  }
}

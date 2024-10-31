import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

interface RoomImage {
  room_image_id: number;
  image: string;
  cover: boolean;
}

interface RoomFeature {
  room_feature_id: number;
  room_feature_name: string;
  room_feature_image: string;
  position: number;
}

export interface IRoom {
  roomId: number;
  roomTypeId: number;
  roomTypeName: string;
  roomImages: RoomImage[] | null;
  roomFeatures: RoomFeature[] | null;
  review: string;
  rate: number;
  countryId: number;
  countryName: string | null;
  basePrice: number;
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
    }> = await axiosInstance.get("/api/room/list", {
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

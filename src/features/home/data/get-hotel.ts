import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

interface HotelImage {
  image_url: string;
}
export interface Hotel {
  hotel_id: number;
  hotel_name: string;
  description: string | null;
  phone: string;
  email: string;
  address: string;
  stars: number;
  check_in: string;
  check_out: string;
  country_id: number;
  city_id: number;
  state_id: number;
  zip_code: string;
  hotel_images: HotelImage[];
}
export async function getHotel({
  lang = "en",
  currency = "usd",
}: {
  lang?: string;
  currency?: string;
}) {
  try {
    const response: AxiosResponse<{
      success: boolean;
      data: {
        hotels: Hotel[];
      };
      message: string;
    }> = await axiosInstance.get("/api/hotels/all", {
      headers: {
        Language: lang,
        Currency: currency,
        Platform: "web",
      },
      data: {
        state_id: 5,
      },
    });
    if (!response.data.success) return { error: response.data.message };
    return { success: true, data: response.data.data.hotels };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { error: "Authentication failed" };
  }
}

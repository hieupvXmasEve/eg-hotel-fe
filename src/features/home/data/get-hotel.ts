import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

// id: 17,
//       hotel_name: 'dsfnds',
//       description: null,
//       phone: '23d',
//       email: 'dsf',
//       address: 'dsfas',
//       stars: 2,
//       check_in: '00:32:00',
//       check_out: '02:32:00',
//       country_id: 6,
//       city_id: 6,
//       state_id: 8,
//       zip_code: 'ádf',
//       insert_date: '2024-10-24T09:30:04.54',
//       insert_user_id: 1,
//       update_date: null,
//       update_user_id: null,
//       delete_date: null,
//       delete_user_id: null,
//       is_active: 0,
//       city: null,
//       country: null,
//       state: null,
//       hotel_images: [],
//       room_reservation_details: [],
//       rooms: []
export interface Hotel {
  id: number;
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
}
export async function getHotel() {
  try {
    const response: AxiosResponse<{
      success: boolean;
      data: {
        hotels: Hotel[];
      };
      message: string;
    }> = await axiosInstance.get("/api/hotels/all");
    if (!response.data.success) return { error: response.data.message };
    return { success: true, data: response.data.data.hotels };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { error: "Authentication failed" };
  }
}

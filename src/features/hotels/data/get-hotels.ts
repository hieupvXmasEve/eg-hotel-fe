import ApiClient from "@/lib/client";
import { Hotel } from "@/types/hotel";

const api = new ApiClient("en", "usd");

export async function getHotels() {
  const hotels = await api.fetch<{
    data: {
      hotels: Hotel[];
    };
  }>("/api/hotels/all", {
    method: "POST",
    data: {
      pageNumb: null,
      pageSize: null,
      sorts: null,
    },
  });
  return hotels.data.hotels;
}

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

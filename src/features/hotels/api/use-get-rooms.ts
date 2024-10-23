import { useQuery } from "@tanstack/react-query";

interface UseGetRoomsProps {
  hotelId: string;
}
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
  room_id: number;
  room_type_id: number;
  room_type_name: string;
  room_images: RoomImage[];
  room_features: RoomFeature[];
  review: string;
  rate: number;
  country_id: number;
  country_name: string;
  base_price: number;
}
export const useGetRooms = ({ hotelId }: UseGetRoomsProps) => {
  const query = useQuery<IRoom[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      console.log("hotelId ->", hotelId);
      // fake data delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return [
        {
          room_id: 1,
          room_type_id: 1,
          room_type_name: "Villa",
          room_images: [
            {
              room_image_id: 1,
              image: "/images/rooms/demo.jpg",
              cover: true,
            },
          ],
          room_features: [
            {
              room_feature_id: 1,
              room_feature_name: "Feature 1",
              room_feature_image: "feature1.jpg",
              position: 1,
            },
          ],
          review: "Review 1",
          rate: 1,
          country_id: 1,
          country_name: "Country 1",
          base_price: 100,
        },
      ];
    },
  });
  return query;
};

import HotelCarousel from "@/features/home/components/hotel-carousel";
import ListRoomType from "@/features/home/components/list-room-type";
import RecentSearch from "@/features/home/components/recent-search";
import RecommendRoom from "@/features/home/components/recommend-room";

export default function Home() {
  return (
    <div className="z-50 -mt-10">
      <RecentSearch />
      <HotelCarousel />
      <ListRoomType />
      <RecommendRoom />
    </div>
  );
}

import RecentSearch from "./components/recent-search";
import HotelCarousel from "./components/hotel-carousel";
import ListRoomType from "./components/list-room-type";
import RecommendRoom from "./components/recommend-room";
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

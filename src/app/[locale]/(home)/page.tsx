import SearchForm from "./components/search-form";
import RecentSearch from "./components/recent-search";
import HotelCarousel from "./components/hotel-carousel";

export default function Home() {
  return (
    <div className="z-50 -mt-10 px-5">
      <SearchForm />
      <RecentSearch />
      <HotelCarousel />
    </div>
  );
}

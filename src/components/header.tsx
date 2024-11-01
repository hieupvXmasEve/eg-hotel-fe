import UserButton from "@/components/user-button";
import SearchForm from "@/features/home/components/search-form";
import { getHotel } from "@/features/home/data/get-hotel";
import { Link } from "@/i18n/routing";
import { DownloadIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Loader } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";
import LanguagesButton from "./languages-button";
import Logo from "./logo";
import { Button } from "./ui/button";

export default async function Header() {
  const t = await getTranslations("home");
  const { data } = await getHotel({});

  const hotels =
    data?.map((hotel) => ({
      hotel_id: hotel.hotel_id,
      hotel_name: hotel.hotel_name,
      value: hotel.hotel_id.toString(),
    })) || [];

  return (
    <>
      <header className="relative pb-8">
        <Image
          src="/header-background.jpg"
          alt="Header background"
          className="rounded-b-3xl object-cover"
          quality={100}
          fill
          priority
        />
        <div className="container relative">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="relative hidden h-full md:block">
              <Logo className="h-14" />
            </Link>
            <Button variant="link" className="text-white md:hidden" size="icon">
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent text-white hover:bg-transparent hover:text-white"
              >
                <DownloadIcon className="h-6 w-6" />
              </Button>
              <Suspense fallback={<Loader className="h-6 w-6" />}>
                <LanguagesButton />
              </Suspense>
              <UserButton />
              {/* <HydrationBoundary state={dehydrate(queryClient)}>
              </HydrationBoundary> */}
            </div>
          </div>
          <div className="relative py-4 text-white">
            <h1 className="text-4xl font-bold">{t("hotel-name")}</h1>
            <p className="mt-2">{t("hotel-address")}</p>
          </div>
          <div className="absolute bottom-0 left-0 w-full translate-y-full px-2 md:px-5">
            <SearchForm hotels={hotels} />
          </div>
        </div>
      </header>
    </>
  );
}

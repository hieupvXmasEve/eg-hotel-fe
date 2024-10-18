import { UserButton } from "@/app/[locale]/(auth)/components/user-button";
import { DownloadIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import LanguagesButton from "./languages-button";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import SearchForm from "@/app/[locale]/(home)/components/search-form";
import Logo from "./logo";
import { Link } from "@/i18n/routing";

export default function Header() {
  const t = useTranslations("home");

  return (
    <>
      <header className="relative pb-8">
        <Image
          src="/header-background.jpg"
          alt="Header background"
          className="rounded-b-3xl object-cover"
          quality={100}
          fill
        />
        <div className="container relative mx-auto">
          <div className="flex h-16 items-center justify-between p-4">
            <Link href="/" className="relative hidden h-full w-32 md:block">
              <Logo />
            </Link>
            <Button variant="link" className="text-white md:hidden" size="icon">
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent text-white hover:bg-transparent hover:text-white"
              >
                <DownloadIcon className="h-6 w-6" />
              </Button>
              <LanguagesButton />
              <UserButton />
            </div>
          </div>
          <div className="relative p-4 text-white">
            <h1 className="text-4xl font-bold">{t("hotel-name")}</h1>
            <p className="mt-2">{t("hotel-address")}</p>
          </div>
          <div className="absolute bottom-0 left-0 w-full translate-y-full px-5">
            <SearchForm />
          </div>
        </div>
      </header>
    </>
  );
}

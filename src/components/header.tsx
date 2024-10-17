import { UserButton } from "@/app/[locale]/(auth)/components/user-button";
import { DownloadIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import LanguagesButton from "./languages-button";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("home");

  return (
    <header className="relative overflow-hidden rounded-b-3xl pb-12">
      <Image
        src="/header-background.jpg"
        alt="Header background"
        className="object-cover"
        quality={100}
        fill
      />

      <div className="relative flex items-center justify-between p-4">
        <Button variant="link" className="text-white" size="icon">
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
    </header>
  );
}

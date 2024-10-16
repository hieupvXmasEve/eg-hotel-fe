import Image from "next/image";
import { Button } from "./ui/button";
import { DownloadIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { UserButton } from "@/app/[locale]/(auth)/components/user-button";

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-b-3xl pb-20">
      <Image
        src="/header-background.jpg"
        alt="Header background"
        className="object-cover"
        quality={100}
        fill
      />
      <div className="relative z-10 flex items-center justify-between p-4">
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
          <UserButton />
        </div>
      </div>
      <div className="relative z-10 p-4 text-white">
        <h1 className="text-4xl font-bold">EG Paradise Angkor Villa Hotel</h1>
        <p className="mt-2">
          Chong Kao Sou Village Slor Kram Commune, Street 60, Siem Reap,
          Cambodia, 17256
        </p>
      </div>
    </header>
  );
}

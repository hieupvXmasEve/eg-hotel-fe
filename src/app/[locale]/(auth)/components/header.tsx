"use client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
export default function Header() {
  return (
    <header className="relative h-20 overflow-hidden rounded-b-3xl pb-20">
      <Image
        src="/header-background.jpg"
        alt="Header background"
        className="object-cover"
        quality={100}
        fill
      />
      <div className="relative flex h-20 items-center justify-between px-4 md:hidden">
        <Link href="/">
          <Button className="size-8 rounded-full p-0" variant="outline">
            <Cross1Icon className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex flex-grow justify-center">
          <Image
            src="/gotels-logo.svg"
            alt="Gotels logo"
            width={140}
            height={40}
          />
        </div>
        <div className="w-6"></div>
      </div>
    </header>
  );
}

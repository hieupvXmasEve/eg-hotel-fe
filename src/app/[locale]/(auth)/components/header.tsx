"use client";
import LanguagesButton from "@/components/languages-button";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { UserButton } from "./user-button";
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
      <div className="container relative mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="md:hidden">
          <Button className="size-8 rounded-full p-0" variant="outline">
            <Cross1Icon className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex h-full items-center justify-center">
          <Link href="/">
            <Logo className="h-14" />
          </Link>
        </div>
        <div className="w-6 md:w-auto">
          <div className="hidden items-center gap-4 md:flex">
            <LanguagesButton />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}

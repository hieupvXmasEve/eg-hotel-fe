"use client";
import { Button } from "@/components/ui/button";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function LanguagesButton() {
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const languages: { code: Locale; name: string; country: string }[] = [
    { code: "en", name: "English", country: "US" },
    { code: "vi", name: "Vietnamese", country: "VN" },
  ];
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const onChangeLanguage = (code: Locale) => {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({ pathname, params }, { locale: code });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Image
            src={`/images/locales/${locale}.png`}
            alt={locale === "en" ? "English" : "Vietnamese"}
            width={28}
            height={28}
            className={isPending ? "hidden" : ""}
          />
          {isPending && <Loader className="size-5 animate-spin text-white" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onSelect={() => onChangeLanguage(language.code)}
            disabled={isPending || language.code === locale}
            className={clsx(
              isPending && "transition-opacity [&:disabled]:opacity-30",
            )}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

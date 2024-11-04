import { Button } from "@/components/ui/button";
import { getAuthCookies } from "@/features/auth/utils";
import { Link } from "@/i18n/routing";
import { History, LogOut, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import LogoutComponent from "./logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function UserButton() {
  const t = await getTranslations("auth");
  const { user, isAuthenticated } = await getAuthCookies();
  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <Image
                src={user.avatar_url}
                alt={user.display_name}
                width={32}
                height={32}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/my-account"
                  className="inline-flex w-full items-center"
                >
                  <User className="mr-2 size-5" />
                  {t("profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/my-account/order-history"
                  className="inline-flex w-full items-center"
                >
                  <History className="mr-2 size-5" />
                  {t("order-history")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex w-full flex-1 items-center">
                  <LogOut className="mr-2 size-5" />
                  <LogoutComponent />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Link href="/sign-in">
      <Button
        variant="outline"
        size="default"
        className="capitalize text-primary hover:text-primary/80"
      >
        {t("user-btn")}
      </Button>
    </Link>
  );
}

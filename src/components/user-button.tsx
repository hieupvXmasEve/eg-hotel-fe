import { Button } from "@/components/ui/button";
import { getAuthState } from "@/features/auth/utils";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Logout from "./logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function UserButton() {
  const t = await getTranslations("auth");
  const { user, isAuthenticated } = getAuthState();

  if (user && isAuthenticated) {
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
                <Link href="/my-account" className="block w-full">
                  {t("profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/my-account/order-history" className="block w-full">
                  {t("order-history")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Logout />
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

"use client";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
// import { auth } from "@clerk/nextjs/server";
import { UserButton as ClerkUserButton, useAuth } from "@clerk/nextjs";
// import { getTranslations } from "next-intl/server";
import { Logs } from "lucide-react";
import { useTranslations } from "next-intl";

export default function UserButton() {
  const t = useTranslations("auth");
  const { userId } = useAuth();
  const router = useRouter();

  if (userId) {
    return (
      <ClerkUserButton>
        <ClerkUserButton.MenuItems>
          <ClerkUserButton.Action
            label="Orders"
            labelIcon={<Logs />}
            onClick={() => router.push("/my-account/order-history")}
          />
        </ClerkUserButton.MenuItems>
      </ClerkUserButton>
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

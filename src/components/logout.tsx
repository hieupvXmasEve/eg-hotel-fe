"use client";

import { signOut } from "@/features/auth/server/actions/sign-out";
import { useTranslations } from "next-intl";

export default function Logout() {
  const t = useTranslations("auth");
  async function handleLogout() {
    await signOut();
  }
  return (
    <div onClick={handleLogout} className="flex flex-1 cursor-pointer">
      {t("logout")}
    </div>
  );
}

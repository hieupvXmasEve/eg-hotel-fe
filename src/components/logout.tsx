"use client";

import { signOut } from "@/features/auth/actions/sign-out";
import { useTranslations } from "next-intl";
import { useUser } from "./user-context";

export default function Logout() {
  const t = useTranslations("auth");
  const { logout } = useUser();
  async function handleLogout() {
    logout();
    await signOut();
  }
  return (
    <div onClick={handleLogout} className="flex flex-1 cursor-pointer">
      {t("logout")}
    </div>
  );
}

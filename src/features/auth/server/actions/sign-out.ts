"use server";
import { clearAuthCookies } from "@/features/auth/utils";
import { redirect } from "@/i18n/routing";

export const signOut = async () => {
  clearAuthCookies();
  redirect("/");
  // You might want to call an API endpoint to invalidate the token on the server-side as well
};

"use server";
import { clearAuthCookies } from "@/features/auth/utils";

export const signOut = async () => {
  clearAuthCookies();
  // You might want to call an API endpoint to invalidate the token on the server-side as well
};

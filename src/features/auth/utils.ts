import { isTokenExpired } from "@/lib/utils";
import { cookies } from "next/headers";

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}
export interface UserData {
  user_id: number;
  email: string;
  display_name: string;
  avatar_url: string;
}
export const setAuthCookies = (accessToken: string, userData: UserData) => {
  const cookieStore = cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  cookieStore.set("userData", JSON.stringify(userData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
};

export const getAuthState = (): AuthState => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value ?? null;
  const userDataCookie = cookieStore.get("userData")?.value;
  const user = userDataCookie ? JSON.parse(userDataCookie) : null;

  const isAuthenticated =
    accessToken !== null && user !== null && !isTokenExpired(accessToken);
  return { user, accessToken, isAuthenticated };
};

export const clearAuthCookies = () => {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userData");
};

"use server";
import { isTokenExpired } from "@/lib/utils";
import { cookies } from "next/headers";

interface AuthCookies {
  user: UserAuth | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}
export interface UserAuth {
  user_id: number;
  email: string;
  display_name: string;
  avatar_url: string;
}
export const setAuthCookies = async (
  accessToken: string,
  userData: UserAuth,
) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
  });
  cookieStore.set("userData", JSON.stringify(userData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
};

export const getAuthCookies = async (): Promise<AuthCookies> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value ?? null;
  const userDataCookie = cookieStore.get("userData")?.value;
  if (accessToken && isTokenExpired(accessToken)) {
    return { user: null, accessToken: null, isAuthenticated: false };
  }
  const user = userDataCookie ? JSON.parse(userDataCookie) : null;
  const isAuthenticated =
    accessToken !== null && user !== null && !isTokenExpired(accessToken);
  return { user, accessToken, isAuthenticated };
};
export async function setTokens(access: string, refresh: string) {
  cookies().set("accessToken", access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
  });

  cookies().set("refreshToken", refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 ngày
  });
}

export const clearAuthCookies = () => {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userData");
};

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { QueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./hooks/use-user-info";
import {
  getAccountDetail,
  UserData,
} from "@/features/my-account/data/get-user-info";

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  isAuthenticated: boolean;
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

export const getAuthState = async (
  queryClient?: QueryClient,
): Promise<AuthState> => {
  const cookieStore = cookies();
  console.log("getAuthState", cookieStore);
  const accessToken = cookieStore.get("accessToken")?.value ?? null;
  console.log("accessToken", !accessToken || isTokenExpired(accessToken));

  if (!accessToken || isTokenExpired(accessToken)) {
    return { user: null, accessToken: null, isAuthenticated: false };
  }

  // Try to get user from cache first
  let userData: UserData | undefined;
  if (queryClient) {
    userData = queryClient.getQueryData(USER_QUERY_KEY);
  }

  // If no cached data, fetch fresh data
  if (!userData) {
    const { data: freshUserData, error } = await getAccountDetail();
    if (error || !freshUserData) {
      return { user: null, accessToken: null, isAuthenticated: false };
    }
    userData = freshUserData;

    // Update cache if queryClient is available
    if (queryClient) {
      queryClient.setQueryData(USER_QUERY_KEY, userData);
    }
  }

  return {
    user: userData ?? null,
    accessToken,
    isAuthenticated: true,
  };
};

export const clearAuthCookies = () => {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userData");
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    console.log("decodedToken", new Date(decodedToken.exp * 1000));
    return decodedToken.exp < currentTime;
  } catch {
    return true;
  }
};

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface UserData {
  user_id: number;
  display_name: string;
  email: string;
  avatar_url: string;
}

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

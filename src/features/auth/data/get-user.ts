"use server";
import ApiClient from "@/lib/client";
import { UserData } from "@/types/user";
import { getAuthCookies } from "../utils";

const api = new ApiClient("en", "usd");

export async function getUser() {
  const { accessToken } = await getAuthCookies();
  if (!accessToken) {
    return null;
  }
  const user = await api.fetch<{
    data: UserData;
  }>("/api/user/info");
  return user.data;
}

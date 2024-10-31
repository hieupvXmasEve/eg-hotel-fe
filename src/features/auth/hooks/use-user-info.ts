"use client";
import axiosInstance from "@/lib/axios";
import { UserData } from "@/features/my-account/data/get-user-info";
import { useQuery } from "@tanstack/react-query";

export const USER_QUERY_KEY = ["user-info"];

const getUserInfo = async (): Promise<UserData> => {
  return axiosInstance.get("/api/user/info");
};

export function useUserInfo() {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUserInfo,
    meta: {
      ERROR_SOURCE: "Failed to fetch user info",
      SUCCESS_MESSAGE: "User info retrieved successfully",
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

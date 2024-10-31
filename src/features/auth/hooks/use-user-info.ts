import { getUserInfo } from "@/features/my-account/data/get-user-info";
import { useQuery } from "@tanstack/react-query";

export const USER_QUERY_KEY = ["user-info"];

export function useUserInfo(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getUserInfo,
    meta: {
      ERROR_SOURCE: "Failed to fetch user info",
      SUCCESS_MESSAGE: "User info retrieved successfully",
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: options?.enabled ?? true,
  });
}

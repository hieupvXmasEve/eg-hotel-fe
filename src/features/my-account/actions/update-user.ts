"use server";

import ApiClient from "@/lib/client";

const api = new ApiClient("en", "usd");

export interface UpdateUserData {
  Gender?: number;
  Birthday?: number;
  FirstName?: string;
  LastName?: string;
  Phone?: string;
  Newsletter?: number;
  DisplayName?: string;
}
export interface UpdateUserResponse {
  success: boolean;
  status: string;
  message?: string;
  data?: {
    access_token: string;
    user_id: number;
    email: string;
    display_name: string;
    avatar_url: string;
  };
}
export const updateUser = async (data: UpdateUserData) => {
  const response = await api.fetch<UpdateUserResponse>("/api/user/update", {
    method: "POST",
    data: data,
  });
  return response.success;
};

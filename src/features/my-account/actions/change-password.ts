"use server";

import { setAuthCookies } from "@/features/auth/utils";
import ApiClient from "@/lib/client";

const api = new ApiClient("en", "usd");

export interface ChangePasswordProps {
  NewPassword?: string;
  OldPassword?: string;
}
export interface ChangePasswordResponse {
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
export const changePassword = async ({
  NewPassword,
  OldPassword,
}: ChangePasswordProps) => {
  const response = await api.fetch<ChangePasswordResponse>(
    "/api/user/change-pass",
    {
      method: "POST",
      data: {
        NewPassword,
        OldPassword,
      },
    },
  );
  if (response.data) {
    console.log("response.data", response.data);
    const { access_token, ...useData } = response.data;
    setAuthCookies(access_token, useData);
  }
  return response.data;
};

"use server";

import { env } from "@/data/env/client";
import { setAuthCookies } from "@/features/auth/utils";
import axiosInstance from "@/lib/axios";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ChangePasswordProps {
  NewPassword?: string;
  OldPassword?: string;
}

export const changePassword = async ({
  data,
}: {
  data: ChangePasswordProps;
}) => {
  const response = await axiosInstance.post(`${API_URL}/api/user/change-pass`, {
    NewPassword: data.NewPassword,
    OldPassword: data.OldPassword,
  });
  if (response.data?.data) {
    console.log("response.data", response.data?.data);
    const { access_token, ...useData } = response.data.data;
    setAuthCookies(access_token, useData);
  }
  return response.data;
};

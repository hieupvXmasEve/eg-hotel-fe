"use server";

import { env } from "@/lib/env";
import axiosInstance from "@/lib/axios";
import { revalidatePath } from "next/cache";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface UpdateUserData {
  Gender?: number;
  Birthday?: number;
  FirstName?: string;
  LastName?: string;
  Phone?: string;
  Newsletter?: number;
  DisplayName?: string;
}

export const updateUser = async (data: UpdateUserData) => {
  const response = await axiosInstance.post(`${API_URL}/api/user/update`, data);
  revalidatePath("/my-account");
  console.log("response", response.data);
  return response.data;
};

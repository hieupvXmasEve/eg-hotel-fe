"use server";

import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface UserData {
  user_id: number;
  display_name: string;
  email: string;
  contact_name: string | null;
  contact_title: string | null;
  avatar_url: string;
  gender: number;
  birthday: string; // Consider using Date if you want to handle it as a date object
  first_name: string;
  last_name: string;
  phone: string;
  fax: string | null;
  website: string | null;
  cnic: string | null;
  ntn: string | null;
  strn: string | null;
  vat: string | null;
  newsletter: number;
  region_id: string | null;
  country_id: string | null;
  state_id: string | null;
  city_id: string | null;
  address: string;
  postal_code: string;
}
export async function getAccountDetail() {
  try {
    const response: AxiosResponse<{
      success: boolean;
      data: UserData;
      message: string;
    }> = await axiosInstance.get("/api/user/info");
    if (!response.data.data) return { error: response.data.message };
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { error: "Authentication failed" };
  }
}

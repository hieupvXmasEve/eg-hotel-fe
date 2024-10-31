"use server";

import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { error: "No access token found" };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return { error: data.message || "Failed to fetch user info" };
  }

  if (!data.data) {
    return { error: data.message };
  }

  return { success: true, data: data.data };
}

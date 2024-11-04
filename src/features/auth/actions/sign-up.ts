"use server";

import ApiClient from "@/lib/client";

const api = new ApiClient();

export interface SignUpData {
  Email: string;
  Password: string;
  Gender: number;
  FirstName: string;
  LastName: string;
  Birthday: number;
  Phone: string;
  Newsletter: number;
  DisplayName: string;
}

export const signUp = async (data: SignUpData) => {
  const response = await api.fetch<{
    success: boolean;
    message: string;
  }>("/api/auth/create", {
    method: "POST",
    data,
  });
  console.log("response", response);
  return {
    success: response.success,
    message: response.message,
  };
};

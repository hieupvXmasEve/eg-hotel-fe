"use server";

import { setAuthCookies } from "@/features/auth/utils";
import axiosInstanceClient from "@/lib/axios-client";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
type SignInActionResponse =
  | {
      error: string;
      success?: undefined;
    }
  | {
      success: boolean;
      error?: undefined;
    };

export async function signInAction(
  formData: FormData,
): Promise<SignInActionResponse> {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await axiosInstanceClient.post("/api/auth/login", {
      Email: email,
      Password: password,
    });
    if (!response.data.success) return { error: response.data.message };
    const { access_token, ...userData } = response.data.data;
    setAuthCookies(access_token, userData);

    return { success: true };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { error: "Authentication failed" };
  }
}

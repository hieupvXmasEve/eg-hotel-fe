"use server";

import { z } from "zod";
import { setAuthCookies } from "@/features/auth/utils";
import axiosInstance from "@/lib/axios";

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
    const response = await axiosInstance.post("/api/auth/login", {
      Email: email,
      Password: password,
    });
    if (!response.data.success) return { error: response.data.message };
    const {
      access_token,
      user_id,
      display_name,
      email: userEmail,
      avatar_url,
    } = response.data.data;

    setAuthCookies(access_token, {
      user_id,
      display_name,
      email: userEmail,
      avatar_url,
    });

    return { success: true };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { error: "Authentication failed" };
  }
}

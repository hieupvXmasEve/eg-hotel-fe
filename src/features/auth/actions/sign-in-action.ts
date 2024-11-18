"use server";

import { setAuthCookies } from "@/features/auth/utils";
import { z } from "zod";
import ApiClient from "@/lib/client";

const api = new ApiClient("en", "usd");

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
    const response = await api.fetch<{
      success: boolean;
      status: string;
      data?: {
        access_token: string;
        user_id: number;
        email: string;
        display_name: string;
        avatar_url: string;
      };
      message?: string;
    }>("/api/auth/login", {
      method: "POST",
      data: {
        Email: email,
        Password: password,
      },
    });
    if (!response.success)
      return { error: response.message ?? "Unknown error" };
    const { access_token, ...userData } = response.data!;
    setAuthCookies(access_token, userData);

    return { success: true };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { error: "Authentication failed" };
  }
}

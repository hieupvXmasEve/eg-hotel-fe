"server-only";
import { cookies } from "next/headers";
import { env } from "./env";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { setTokens } from "@/features/auth/utils";

type Language = "vi" | "en";
type Currency = "usd" | "vnd";

class ApiClient {
  private baseUrl: string;
  private lang: Language;
  private currency: Currency;
  private axiosInstance: AxiosInstance;

  constructor(lang: Language = "vi", currency: Currency = "vnd") {
    this.baseUrl = env.NEXT_PUBLIC_API_URL!;
    this.lang = lang;
    this.currency = currency;

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Language: this.lang,
        Currency: this.currency,
        Platform: "web",
        "Content-Type": "application/json",
      },
    });

    // Thêm interceptor để xử lý token
    this.axiosInstance.interceptors.request.use((config) => {
      const cookieStore = cookies();
      const accessToken = cookieStore.get("access_token")?.value;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Xử lý refresh token
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log("===", error.response?.status);
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await this.refreshToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.axiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  async fetch<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response = await this.axiosInstance({
        url: endpoint,
        ...options,
      });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {} as T;
      // throw new Error(`API error: ${error}`);
    }
  }

  private async refreshToken(): Promise<string | null> {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await axios.post(`${this.baseUrl}/auth/refresh`, {
        refresh_token: refreshToken,
      });

      await setTokens(response.data.access_token, response.data.refresh_token);
      return response.data.access_token;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      cookies().delete("access_token");
      cookies().delete("refresh_token");
      return null;
    }
  }
}

export default ApiClient;

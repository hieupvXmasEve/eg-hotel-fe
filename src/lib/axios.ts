"use server";
import axios, { AxiosError, AxiosResponse } from "axios";
import { env } from "@/data/env/client";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data; // Automatically extract data
  },
  async (error: AxiosError) => {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
    });
  },
);

export default axiosInstance;

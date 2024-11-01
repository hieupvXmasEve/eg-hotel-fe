import { env } from "@/data/env/client";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import https from "https";
// Add a variable to store the token
let authToken: string | null = null;

// Add a function to set the token
export const setAuthToken = (token: string | null) => {
  authToken = token;
};
export const client = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    // Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  timeout: 10000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response; // Simply return the response
  },
  async (error: AxiosError) => {
    const status = error.response ? error.response.status : null;
    console.log("error", error);
    if (status === 401) {
      try {
        // const refreshTokenFromStorage = localStorage.getItem(
        //   STORAGE_TOKEN.REFRESH_TOKEN
        // );
        // const { accessToken, refreshToken } = await AuthService.refresh(
        //   refreshTokenFromStorage
        // );

        // LocalStorageService.setTokens(accessToken, refreshToken);
        client.defaults.headers.common.Authorization = `Bearer ${authToken}`;

        // return await client(error.config as AxiosRequestConfig);
        return Promise.reject(error);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (status === 403 && error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);
export default client;

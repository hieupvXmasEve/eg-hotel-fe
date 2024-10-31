import { env } from "@/data/env/client";
import axios from "axios";
import https from "https";

const axiosInstanceClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
export default axiosInstanceClient;

import { env } from "@/data/env/client";
import axios from "axios";

const API_URL = env.NEXT_PUBLIC_API_URL;

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
  const response = await axios.post(`${API_URL}/api/auth/create`, data);
  return response.data;
};

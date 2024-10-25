import { env } from "@/data/env/client";
import axios from "axios";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const convertNewsletter = (newsletter: string[]) => {
  //if no newsletter, return 0
  // if newsletter has 2 items return 4
  // if newsletter has 1 item and item is promotion return 1
  // if newsletter has 1 item and item is event return 2
  if (newsletter.length === 0) return 0;
  if (newsletter.length === 2) return 4;
  if (newsletter.length === 1 && newsletter[0] === "Promotion") return 1;
  if (newsletter.length === 1 && newsletter[0] === "Event") return 2;
  return 0;
};
export interface SignUpData {
  Email: string;
  Password: string;
  Gender: boolean;
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

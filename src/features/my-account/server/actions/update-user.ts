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
export interface UpdateUserData {
  Password?: string;
  DisplayName: string;
  ContactName: string;
  ContactTitle: string;
  AvatarUrl: string;
  Gender: number;
  Birthday: number;
  FirstName: string;
  LastName: string;
  Phone: string;
  Fax: string;
  Website: string;
  CNIC: string;
  NTN: string;
  STRN: string;
  VAT: string;
  Newsletter: number;
  RegionId: number;
  CountryId: number;
  StateId: number;
  CityId: number;
  Address: string;
  PostalCode: string;
}

export const updateUser = async (data: UpdateUserData) => {
  const response = await axios.post(`${API_URL}/api/user/update`, data);
  return response.data;
};

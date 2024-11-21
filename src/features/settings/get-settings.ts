import ApiClient from "@/lib/client";

const api = new ApiClient("en", "usd");

export interface SettingsInfo {
  company_name: string;
  company_email: string;
  address: string;
  phone: string | null;
  logo: string;
  favicon: string;
  system_name: string;
  system_title: string;
  hotline_number: string;
  contact_email: string;
  about: string;
  discount: number;
}

export async function getSettings(): Promise<SettingsInfo> {
  const response = await api.fetch<{ data: SettingsInfo }>("/api/setting/info");
  return response.data;
}

"use client";
import { usePathname } from "next/navigation";

export default function HotelPage() {
  const pathname = usePathname();

  return <div>{pathname}</div>;
}

"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { History, LogOut, User } from "lucide-react";
import { useState } from "react";
const menuItems = [
  { id: "profile", label: "Profile", icon: User, path: "/" },
  // { id: "bookings", label: "Bookings", icon: Hotel, path: "/my-account/bookings" },
  {
    id: "history",
    label: "Order History",
    icon: History,
    path: "order-history",
  },
  // { id: "payments", label: "Payment Methods", icon: CreditCard, path: "/my-account/payments" },
  // { id: "settings", label: "Account Settings", icon: Settings, path: "/my-account/settings" },
];
export default function SidebarAccount() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <aside className="w-full border-r bg-white p-6 md:w-64">
      <h2 className="mb-6 text-2xl font-bold">My Account</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            href={{
              pathname: "/my-account/[section]",
              params: {
                section: item.path,
              },
            }}
            key={item.id}
          >
            <Button
              variant={activeSection === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <Separator className="my-4" />
      <Button
        variant="outline"
        className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </aside>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/routing";
import { History, User } from "lucide-react";
const menuItems = [
  { id: "profile", label: "Profile", icon: User, path: "" },
  {
    id: "history",
    label: "Order History",
    icon: History,
    path: "order-history",
  },
];
export default function SidebarAccount() {
  const pathname = usePathname();
  return (
    <aside className="w-full rounded-lg border bg-white p-6 md:w-64">
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
              variant={
                pathname === `/my-account${item.path ? `/${item.path}` : ""}`
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      {/* <Separator className="my-4" />
      <Button
        variant="outline"
        className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-700"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        {t("logout")}
      </Button> */}
    </aside>
  );
}

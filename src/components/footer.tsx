"use client";
import { Link, Pathnames, usePathname } from "@/i18n/routing";
import {
  PhoneCallIcon,
  BadgePercentIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  // Định nghĩa biến routes
  const routes: { icon: React.ReactNode; label: string; href: Pathnames }[] = [
    { icon: <SearchIcon className="h-6 w-6" />, label: "Search", href: "/" },
    {
      icon: <BadgePercentIcon className="h-6 w-6" />,
      label: "Promotion",
      href: "/promotion",
    },
    {
      icon: <BellIcon className="h-6 w-6" />,
      label: "Service",
      href: "/service",
    },
    {
      icon: <PhoneCallIcon className="h-6 w-6" />,
      label: "Hotline",
      href: "/hotline",
    },
    {
      icon: <UserIcon className="h-6 w-6" />,
      label: "Profile",
      href: "/profile",
    },
  ];

  return (
    <footer>
      {/* Mobile footer */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white shadow-lg md:hidden">
        <div className="grid grid-cols-5">
          {routes.map((route) => (
            <FooterItem
              key={route.label}
              icon={route.icon}
              label={route.label}
              href={route.href}
              isActive={pathname === route.href}
            />
          ))}
        </div>
      </div>

      {/* Desktop footer */}
      <div className="hidden bg-gray-100 py-6 md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="mb-4 w-full md:mb-0 md:w-1/3">
              <h3 className="mb-2 text-lg font-semibold">
                EG Paradise Angkor Villa Hotel
              </h3>
              <p className="text-sm text-gray-600">
                Luxury accommodation in Siem Reap, Cambodia
              </p>
            </div>
            <div className="mb-4 w-full md:mb-0 md:w-1/3">
              <h4 className="text-md mb-2 font-semibold">Quick Links</h4>
              <ul className="text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/amenities"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Amenities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-md mb-2 font-semibold">Contact Us</h4>
              <p className="text-sm text-gray-600">
                Chong Kao Sou Village Slor Kram Commune, Street 60, Siem Reap,
                Cambodia, 17256
              </p>
              <p className="text-sm text-gray-600">Phone: +855 XX XXX XXX</p>
              <p className="text-sm text-gray-600">
                Email: info@egparadiseangkor.com
              </p>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            © 2024 EG Paradise Angkor Villa Hotel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({
  icon,
  label,
  href,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  href: Pathnames;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex cursor-pointer flex-col items-center py-2 ${isActive ? "text-primary" : "text-gray-500 hover:text-primary"}`}
    >
      <div
        className={`${isActive ? "bg-primary text-white" : ""} rounded-full p-1`}
      >
        {icon}
      </div>
      <span className={`mt-1 text-xs ${isActive ? "font-semibold" : ""}`}>
        {label}
      </span>
    </Link>
  );
}

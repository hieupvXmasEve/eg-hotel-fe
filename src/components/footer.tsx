"use client";
import { Link, usePathname } from "@/i18n/routing";
import {
  BadgePercentIcon,
  BellIcon,
  PhoneCallIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import LogoColor from "./logo-color";
import { useTranslations } from "next-intl";

type FooterPathname =
  | "/promotion"
  | "/service"
  | "/hotline"
  | "/"
  | "/my-account";
export default function Footer({}) {
  const pathname = usePathname();
  const t = useTranslations();
  // Định nghĩa biến routes
  const routes: {
    icon: React.ReactNode;
    label: string;
    href: FooterPathname;
  }[] = [
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
      href: "/my-account",
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
          <div className="grid grid-cols-12 gap-4">
            {/* column 1 */}
            <div className="col-span-3 flex flex-col gap-4">
              <LogoColor />
              <p className="text-sm text-gray-600">
                The starting point for your next project with Minimal UI Kit,
                built on the newest version of Material-UI ?, ready to be
                customized to your style.
              </p>
            </div>
            {/* column 2 */}
            <div className="col-span-2 col-start-6">
              <h4 className="text-md mb-2 font-semibold">
                {t("footer.minimals")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-primary"
                  >
                    {t("footer.about-us")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-primary"
                  >
                    {t("footer.contact-us")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/amenities"
                    className="text-gray-600 hover:text-primary"
                  >
                    {t("footer.fag")}
                  </Link>
                </li>
              </ul>
            </div>
            {/* column 3 */}
            <div className="col-span-2">
              <h4 className="text-md mb-2 font-semibold">
                {t("footer.legal")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-primary">
                    {t("footer.terms-of-service")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies"
                    className="text-gray-600 hover:text-primary"
                  >
                    {t("footer.privacy-policy")}
                  </Link>
                </li>
              </ul>
            </div>
            {/* column 4 */}
            <div className="col-span-3">
              <h4 className="text-md mb-2 font-semibold">
                {t("footer.contact")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <p className="text-gray-600">{t("home.hotel-address")}</p>
                </li>
                <li>
                  <a
                    href="tel:+855123456789"
                    className="text-gray-600 hover:text-primary"
                  >
                    {t("home.hotel-phone")}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@minimals.cc"
                    className="text-gray-600 hover:text-primary"
                  >
                    {t("home.hotel-email")}
                  </a>
                </li>
              </ul>
            </div>
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
  href: FooterPathname;
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

import { defineRouting } from "next-intl/routing";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { AppConfig } from "@/utils/app-config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: AppConfig.locales,

  // Used when no locale matches
  defaultLocale: AppConfig.defaultLocale,
  pathnames: {
    "/": "/",
    "/sign-in": "/sign-in",
    "/sign-up": "/sign-up",
    "/forgot-password": "/forgot-password",
    "/reset-password": "/reset-password",
    "/rooms": "/rooms",
    "/about": "/about",
    "/policies": "/policies",
    "/promotion": "/promotion",
    "/service": "/service",
    "/hotline": "/hotline",
    "/my-account": "/my-account",
    "/my-account/order-history": "/my-account/order-history",
    "/my-account/[section]": "/my-account/[section]",
    "/checkout": "/checkout",
    "/amenities": "/amenities",
    "/contact": "/contact",
    "/booking": "/booking",
    "/payment-success": "/payment-success",
    "/review": "/review",
    "/orders": "/orders",
    "/[hotelName]": "/[hotelName]",
    "/[hotelName]/[roomName]": "/[hotelName]/[roomName]",
    "#": "/#",
  },
});

// export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, getPathname, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);

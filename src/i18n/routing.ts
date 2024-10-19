import { defineRouting } from "next-intl/routing";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "vi",
  pathnames: {
    "/": "/",
    "/sign-in": "/sign-in",
    "/sign-up": "/sign-up",
    "/forgot-password": "/forgot-password",
    "/reset-password": "/reset-password",
    "/rooms": "/rooms",
    "/about": "/about",
    "/promotion": "/promotion",
    "/service": "/service",
    "/hotline": "/hotline",
    "/profile": "/profile",

    "/amenities": "/amenities",
    "/contact": "/contact",
    "/booking": "/booking",
    "/payment": "/payment",
    "/review": "/review",
    "/[hotelName]": {
      en: "/[hotelName]",
      vi: "/[hotelName]",
    },
    "/[hotelName]/[roomName]": {
      en: "/[hotelName]/[roomName]",
      vi: "/[hotelName]/[roomName]",
    },
    "#": "/#",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, getPathname, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);

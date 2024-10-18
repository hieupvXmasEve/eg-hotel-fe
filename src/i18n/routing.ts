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
    "/promotion": "/promotion",
    "/amenities": "/amenities",
    "/contact": "/contact",
    "/hotline": "/hotline",
    "/profile": "/profile",
    "/booking": "/booking",
    "/service": "/service",
    "/payment": "/payment",
    "/review": "/review",
    "#": "/#",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);

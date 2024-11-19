import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getAuthCookies } from "./features/auth/utils";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

const PROTECTED_ROUTES = ["/my-account"];

export default async function middleware(req: NextRequest) {
  const [, locale, ...segments] = req.nextUrl.pathname.split("/");
  const pathname = `/${segments.join("/")}`;
  // get query params from url
  const queryParams = req.nextUrl.searchParams;
  // check if query params has hotel_id then add it to headers
  if (queryParams.has("hotel_id")) {
    req.headers.set("hotel_id", queryParams.get("hotel_id") || "");
  }
  // Apply intl middleware for all routes
  const response = intlMiddleware(req);

  const authState = await getAuthCookies();
  // Redirect authenticated users from public routes to home
  //  // Check if the route is protected
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!authState.isAuthenticated) {
      // Redirect to sign-in page if not authenticated
      const signInUrl = new URL(`/${locale}/sign-in`, req.url);
      signInUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (
    authState.isAuthenticated &&
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};

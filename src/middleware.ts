import { routing } from "@/i18n/routing";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

const isProtectedRoute = createRouteMatcher([
  "/:locale/my-account(.*)",
  // Thêm các route được bảo vệ khác vào đây
]);
const isAuthRoute = createRouteMatcher([
  "/:locale/sign-in(.*)",
  "/:locale/sign-up(.*)",
  // Thêm các route xác thực khác vào đây
]);
const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware((auth, req) => {
  // Không áp dụng bảo vệ cho các route xác thực
  if (isAuthRoute(req)) {
    return intlMiddleware(req);
  }

  // Bảo vệ các route cần xác thực
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(vi|en)/:path*",
    // only applies this middleware to files in the app directory
    "/((?!api|_next|.*\\..*).*)",
    // "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // "/(api|trpc)(.*)",
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // "/((?!_next|_vercel|.*\\..*).*)",
  ],
};

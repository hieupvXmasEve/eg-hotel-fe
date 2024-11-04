// import QueryProviders from "@/components/query-provider";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { getAuthCookies } from "@/features/auth/utils";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/stores/auth/auth-provider";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
// export const metadata: Metadata = {
//   title: "EG Paradise Angkor Villa Hotel",
//   description: "Luxury hotel in Siem Reap, Cambodia",
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//   },
// };
type Props = {
  children: ReactNode;
  params: { locale: string };
};
export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const { accessToken, user } = getAuthCookies();
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <AuthProvider accessToken={accessToken} user={user}>
            {children}
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

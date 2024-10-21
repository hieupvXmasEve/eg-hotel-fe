import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProviders from "@/components/query-provider";
import { routing } from "@/i18n/routing";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <QueryProviders>{children}</QueryProviders>
        <Toaster />
      </body>
    </html>
  );
}

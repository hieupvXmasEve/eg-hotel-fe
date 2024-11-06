import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import { Viewport } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};
export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: t("author") }],
    creator: t("creator"),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ),
    openGraph: {
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      url: "/",
      title: t("title"),
      description: t("description"),
      siteName: t("title"),
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og-image.jpg"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    },
    manifest: "/site.webmanifest",
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Add viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
      >
        <NextTopLoader
          color="#2299DD"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          showSpinner={false}
          height={5}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

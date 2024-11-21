import { SettingsProvider } from "@/components/settings-context";
import { UserProvider } from "@/components/user-context";
import { getAuthCookies } from "@/features/auth/utils";
import { getSettings } from "@/features/settings/get-settings";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const { user } = await getAuthCookies();
  const settings = await getSettings();

  return (
    <NextIntlClientProvider messages={messages}>
      <UserProvider userDefault={user}>
        <SettingsProvider settings={settings}>{children}</SettingsProvider>
      </UserProvider>
    </NextIntlClientProvider>
  );
}

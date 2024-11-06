import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/routing/types";

const localePrefix: LocalePrefix = "as-needed";

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: "EG Paradise Angkor Villa Hotel",
  description: "Luxury hotel in Siem Reap, Cambodia",
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix,
};

"use client";

import { SettingsInfo } from "@/features/settings/get-settings";
import { createContext, useContext } from "react";

const SettingsContext = createContext<SettingsInfo | null>(null);

export function SettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SettingsInfo;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return settings;
}

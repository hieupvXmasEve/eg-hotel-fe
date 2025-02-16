"use client";

import { UserAuth } from "@/features/auth/utils";
import { createContext, useContext, ReactNode } from "react";

interface UserContextType {
  user: UserAuth | null;
  // setUser: (user: UserAuth | null) => void;
  isAuthenticated: boolean;
  // logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  userDefault,
}: {
  children: ReactNode;
  userDefault: UserAuth | null;
}) {
  const value = {
    user: userDefault,
    isAuthenticated: !!userDefault,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

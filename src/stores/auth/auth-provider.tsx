"use client";

import { ReactNode, useEffect } from "react";
import { AuthContext } from "./auth-context";

import { setAuthToken } from "../../lib/axios-client";
import { UserData } from "@/features/auth/utils";

interface AuthProviderProps {
  accessToken: string | null;
  user: UserData | null;
  children: ReactNode;
}

export function AuthProvider({
  accessToken,
  user,
  children,
}: AuthProviderProps) {
  useEffect(() => {
    // Update the axios client's token whenever the accessToken changes
    setAuthToken(accessToken);
  }, [accessToken]);
  return (
    <AuthContext.Provider value={{ accessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}

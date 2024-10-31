"use client";

import { ReactNode, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { UserData } from "@/features/my-account/data/get-user-info";
import { setAuthToken } from "./axios-client";

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

import { UserAuth } from "@/features/auth/utils";
import { createContext, useContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  user: UserAuth | null;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

import { UserData } from "@/features/my-account/data/get-user-info";
import { createContext, useContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  user: UserData | null;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

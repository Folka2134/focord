import { useUser } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types";
import { createContext, useContext } from "react";

type AuthContextType = {
  user: UserResource | null;
  isSignedIn: boolean;
  isLoaded: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isSignedIn = false, isLoaded } = useUser();

  const value = {
    user: user ?? null,
    isSignedIn,
    isLoaded,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

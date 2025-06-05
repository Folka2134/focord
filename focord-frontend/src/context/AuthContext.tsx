import { createContext, useContext } from "react";

// TODO: Auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <AuthContext.Provider value={{ user, isSignedIn, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

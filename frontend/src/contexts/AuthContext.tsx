import React, { createContext, useState, useContext, ReactNode } from "react";

import { useAxiosInterceptor } from "utils/axios";

interface UserObject {
  id: string;
  name: string;
  picture: string;
  email: string;
}

interface AuthContextProps {
  authenticatedUser: UserObject | null;
  setAuthenticatedUser: (user: UserObject | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AxiosInterceptorHolder = ({ children }: { children: ReactNode }) => {
  useAxiosInterceptor();

  return <>{children}</>;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<UserObject | null>(
    null
  );

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      <AxiosInterceptorHolder>{children}</AxiosInterceptorHolder>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

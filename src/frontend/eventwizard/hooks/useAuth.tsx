import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthKeys {
  authId: string;
  authSecret: string;
}

interface AuthContextInterfaces extends AuthKeys {
  setAuth: (auth: AuthKeys) => void;
}

const AuthContext = createContext<AuthContextInterfaces>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthKeys>();

  useEffect(() => {
    axios.defaults.headers.common["X-TBA-Auth-Id"] = auth?.authId;
    axios.defaults.headers.common["X-TBA-Auth-Sig"] = auth?.authSecret;
  }, [auth]);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

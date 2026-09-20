"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api, getToken, setToken } from "@/lib/api";

type AuthState = {
  isAdmin: boolean;
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .me()
      .then((data) => setUsername(data.username))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (u: string, p: string) => {
    const data = await api.login(u, p);
    setToken(data.token);
    setUsername(data.username);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAdmin: !!username, username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

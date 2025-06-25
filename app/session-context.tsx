"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SessionContextType {
  token: string | null;
  userId: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

function parseUserIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id || payload.id || payload.sub || null;
  } catch {
    return null;
  }
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (storedToken) {
      setTokenState(storedToken);
      setUserId(parseUserIdFromToken(storedToken));
    }
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
      setUserId(parseUserIdFromToken(newToken));
    } else {
      localStorage.removeItem("auth_token");
      setUserId(null);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <SessionContext.Provider value={{ token, userId, setToken, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
} 
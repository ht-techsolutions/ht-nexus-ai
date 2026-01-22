import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type User = any;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  loginWithToken: (token: string) => Promise<User | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseUserFromResponse = (res: any): User | null => {
    if (!res) return null;
    // Support different backend shapes: { status: 'success', data: user } or { user } or raw user
    if (res.data && res.data.status === "success") return res.data.data ?? null;
    if (res.data && res.data.user) return res.data.user;
    if (res.data && typeof res.data === "object") return res.data;
    return null;
  };

  const refreshUser = async (): Promise<User | null> => {
    try {
      const res = await api.get("/user");
      const u = parseUserFromResponse(res);
      setUser(u);
      return u;
    } catch (e) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loginWithToken = async (token: string) => {
    localStorage.setItem("ht_nexus_token", token);
    // Allow axios interceptor to pick up the token, then fetch user
    const u = await refreshUser();
    // Note: Toast is handled by the calling component (Login.tsx, AuthComplete.tsx)
    // to avoid duplicate notifications
    return u;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // ignore network errors
    }
    localStorage.removeItem("ht_nexus_token");
    setUser(null);
    toast({ title: "Logged out", description: "You have been logged out." });
  };

  useEffect(() => {
    // initialize once
    refreshUser();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "ht_nexus_token") {
        // token changed in another tab
        refreshUser();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithToken, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

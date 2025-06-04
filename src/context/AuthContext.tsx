import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

interface LoginResponse {
  success: boolean;
  requires2FA?: boolean;
  tempToken?: string;
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
  tempToken: string | null;
  setTempToken: (token: string | null) => void;
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [tempToken, setTempToken] = useState<string | null>(null);

 const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/check-auth", {
        method: "GET",
        credentials: "include",
      });
      setIsAuthenticated(res.ok);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    checkAuth();
  }, []); 

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        return {
          success: false,
          error: res.status === 401 ? "Email ou mot de passe invalide" : "Erreur lors de la connexion",
        };
      }

      const resJson = await res.json();
      const { data } = resJson;

      if (data?.requires2FA) {
        setTempToken(data.tempToken);
        return { success: false, requires2FA: true, tempToken: data.tempToken };
      }
      await checkAuth();

      setIsAuthenticated(true);
      setTempToken(null);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Erreur réseau" };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setIsAuthenticated(false);
      setTempToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, loading, tempToken, setTempToken, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

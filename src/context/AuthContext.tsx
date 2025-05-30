import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

interface LoginResponse {
  success: boolean;
  requires2FA?: boolean;
  tempToken?: string;
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
  tempToken: string | null;
  setTempToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tempToken, setTempToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      console.log("Before fetch login");
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      console.log("After fetch login - status:", res.status);

      if (!res.ok) {
        if (res.status === 401) {
          return { success: false, error: "Email ou mot de passe invalide" };
        }
        return { success: false, error: "Erreur lors de la connexion" };
      }

      const resJson = await res.json();
      const { data, message, success } = resJson;

      console.log("Login response data:", data);

      if (data?.requires2FA) {
        setTempToken(data.tempToken);
        return {
          success: false,
          requires2FA: true,
          tempToken: data.tempToken,
        };
      }

      setIsAuthenticated(true);
      setTempToken(null);
      return { success: true };
    } catch (err) {
      console.error("Login fetch error:", err);
      return { success: false, error: "Erreur réseau" };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    } finally {
      setIsAuthenticated(false);
      setTempToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, loading, tempToken, setTempToken }}>
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

import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import API_URL from "../config";
import type { User } from "../features/profile/MyProfile/MyProfileHelpers";
import { useLocation, useNavigate } from "react-router-dom";

interface LoginResponse {
  success: boolean;
  requires2FA?: boolean;
  tempToken?: string;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
  tempToken: string | null;
  setTempToken: (token: string | null) => void;
  loginWithToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/reset-password",
  "/activate",
  "/oauth/success",
  "/conditions-utilisation",
  "/confidentialite",
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [tempToken, setTempToken] = useState<string | null>(null);

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) {
          setIsAuthenticated(false);
          navigate("/", { replace: true });
          return;
        }

        const res = await fetch(`${API_URL}/api/users/my-profile`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/", { replace: true });
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          return {
            success: false,
            error: "Email ou mot de passe invalide",
          };
        }
        return { success: false, error: "Erreur lors de la connexion" };
      }

      const resJson = await res.json();
      const { data, message: _message, success: _success } = resJson;

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
      return { success: false, error: "Erreur réseau" };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
    } finally {
      setIsAuthenticated(false);
      setTempToken(null);
    }
  };

  const loginWithToken = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/my-profile`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur lors de la connexion via token :", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        loading,
        tempToken,
        setTempToken,
        loginWithToken,
      }}
    >
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

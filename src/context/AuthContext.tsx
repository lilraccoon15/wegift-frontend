import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import API_URL from "../config";
import type { User } from "../features/profile/MyProfile/MyProfileHelpers";

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
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [tempToken, setTempToken] = useState<string | null>(null);

    const refreshProfile = async () => {
        try {
            const profileRes = await fetch(`${API_URL}/api/users/my-profile`, {
                method: "GET",
                credentials: "include",
            });

            if (profileRes.ok) {
                const resJson = await profileRes.json();
                const profile = resJson.data?.profile; // <-- récupère bien le profil

                if (profile) {
                    setUser(profile);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
                    method: "POST",
                    credentials: "include",
                });

                if (refreshRes.ok) {
                    await refreshProfile();
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        const interval = setInterval(() => {
            fetch(`${API_URL}/api/auth/refresh`, {
                method: "POST",
                credentials: "include",
            }).catch(() => {
                console.warn("Échec du refresh silencieux");
            });
        }, 50 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

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
            const { data } = resJson;

            if (data?.requires2FA) {
                setTempToken(data.tempToken);
                return {
                    success: false,
                    requires2FA: true,
                    tempToken: data.tempToken,
                };
            }

            await refreshProfile();
            return { success: true };
        } catch {
            return { success: false, error: "Erreur réseau" };
        }
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } finally {
            setIsAuthenticated(false);
            setUser(null);
            setTempToken(null);
        }
    };

    // 🔒 Blocage du rendu tant que le chargement n’est pas terminé
    if (loading) return null;

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
                refreshProfile,
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

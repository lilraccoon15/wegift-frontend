import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../features/Login/LoginForm";
import TwoFAForm from "../features/Login/2FAForm";
import Message from "../components/ui/Message";
import { login, verify2FACode } from "../features/Login/LoginHelpers";

const Login = () => {
    const {
        isAuthenticated,
        setIsAuthenticated,
        tempToken,
        setTempToken,
        loading,
    } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [twoFACode, setTwoFACode] = useState("");
    const [requires2FA, setRequires2FA] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);

        if (!requires2FA) {
            const response = await login(email, password);

            if (response.error) {
                setError(response.error);
                return;
            }

            if (response.requires2FA && response.tempToken) {
                setRequires2FA(true);
                setTempToken(response.tempToken);
                return;
            }

            if (response.success || response.message === "Connexion réussie") {
                setIsAuthenticated(true);
                navigate("/dashboard", { replace: true });
            }
        } else {
            if (!tempToken) {
                setError("Erreur interne : token temporaire manquant");
                return;
            }

            const result = await verify2FACode(twoFACode, tempToken);

            if (!result.success) {
                setError(result.error || "Code 2FA invalide");
                return;
            }

            setRequires2FA(false);
            setTwoFACode("");
            setError(null);
            setTempToken(null);
            setIsAuthenticated(true);
            navigate("/dashboard", { replace: true });
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <h1 className="text-xl font-bold">Connexion</h1>

            {!requires2FA ? (
                <>
                    <LoginForm
                        email={email}
                        onEmailChange={(e) => setEmail(e.target.value)}
                        password={password}
                        onPasswordChange={(e) => setPassword(e.target.value)}
                        onSubmit={handleLoginSubmit}
                        error={error}
                        disabled={loading}
                        buttonClassName="bg-green-600 hover:bg-green-700"
                    />
                    <div className="text-right mt-2">
                        <Link
                            to="/reset-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>
                </>
            ) : (
                <TwoFAForm
                    code={twoFACode}
                    onCodeChange={(e) => setTwoFACode(e.target.value)}
                    onSubmit={handleLoginSubmit}
                    error={error}
                />
            )}

            {error && <Message type="error" text={error} />}
        </div>
    );
};

export default Login;

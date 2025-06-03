import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import LoginForm from "./LoginForm";
import TwoFAForm from "./2FAForm";
import Message from "../../ui/Message";
import { login, verify2FACode } from "./LoginHelpers";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, tempToken, setTempToken, loading } = useAuth();
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

  const handleLoginSubmit = async () => {
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

      if (response.token) {
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
        <LoginForm
          email={email}
          onEmailChange={(e) => setEmail(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLoginSubmit}
          error={error}
        />
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

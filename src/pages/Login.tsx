import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const { login, isAuthenticated, setIsAuthenticated, tempToken, setTempToken, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const verify2FACode = async (code: string, tempToken: string) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, tempToken }),
        credentials: "include",
      });
      if (!res.ok) return false;

      const meRes = await fetch("http://localhost:4000/api/users/me", {
        credentials: "include",
      });

      if (meRes.ok) {
        setTempToken(null);
        return true;
      }

      return false; 
    } catch {
      return false;
    }
  };

  const handleLogin = async () => {
    setError(null);

    if (!requires2FA) {
      const response = await login(email, password);

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.requires2FA) {
        setRequires2FA(true);
        return;
      }
    } else {
      if (!tempToken) {
        setError("Erreur interne : token temporaire manquant");
        return;
      }

      const success = await verify2FACode(twoFACode, tempToken);
      if (!success) {
        setError("Code 2FA invalide");
      } else {
        setRequires2FA(false);
        setTwoFACode("");
        setError(null);
        setTempToken(null);
        setIsAuthenticated(true);  // <-- C’est cette ligne qui manquait !
        navigate("/dashboard", { replace: true });
      }
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Connexion</h1>
      {!requires2FA && (
        <>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      {requires2FA && (
        <input
          type="text"
          placeholder="Code 2FA"
          className="w-full p-2 border"
          value={twoFACode}
          onChange={(e) => setTwoFACode(e.target.value)}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {requires2FA ? "Valider code 2FA" : "Se connecter"}
      </button>
      {!requires2FA && <Link to="/reset-password">Mot de passe oublié ?</Link>}
    </div>
  );
};

export default Login;

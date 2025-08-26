import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { login, verify2FACode } from "./LoginHelpers";
import type { NavigateFunction } from "react-router-dom";

export const useManageLogin = (navigate: NavigateFunction) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    tempToken,
    setTempToken,
    loading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onRememberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRemember((e.target as HTMLInputElement).checked);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (!requires2FA) {
      const response = await login(email, password, remember);

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

  return {
    loading,
    requires2FA,
    email,
    setEmail,
    password,
    setPassword,
    handleLoginSubmit,
    error,
    twoFACode,
    setTwoFACode,
    remember,
    onRememberChange,
  };
};

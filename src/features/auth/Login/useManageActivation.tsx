import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API_URL from "../../../config";

export const useManageActivation = (navigate: any) => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

  const [message, setMessage] = useState<string | null>(
    "Activation en cours..."
  );
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    
    const activate = async () => {
      if (!token) {
        setError("Token d'activation manquant.");
        setMessage(null);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/api/auth/activate?token=${token}`
        );
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || "Activation terminée.");
          setError(null);
          setTimeout(() => navigate("/login", { replace: true }), 3000);
        } else {
          setError(data.message || "Erreur lors de l'activation.");
          setMessage(null);
        }
      } catch {
        setError("Erreur lors de l'activation.");
        setMessage(null);
      }
    };

    activate();
  }, [token, navigate]);

  return {
    message,
    error
  }
}
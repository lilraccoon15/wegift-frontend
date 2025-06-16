import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API_URL from "../../config";

const ActivatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Activation du compte</h1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ActivatePage;

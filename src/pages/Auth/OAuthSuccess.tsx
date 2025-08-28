import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate("/");
      } else {
        navigate("/login?error=oauth");
      }
    }
  }, [loading, isAuthenticated, navigate]);

  return <p>Connexion via Google en cours...</p>;
};

export default OAuthSuccess;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    // Plus besoin de token en query
    loginWithToken()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/login?error=oauth");
      });
  }, []);

  return <p>Connexion via Google en cours...</p>;
};

export default OAuthSuccess;

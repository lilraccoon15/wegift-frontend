import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            document.cookie = `token=${token}; path=/; SameSite=Lax`;

            loginWithToken();

            navigate("/");
        } else {
            navigate("/login?error=oauth");
        }
    }, []);

    return <p>Connexion via Google en cours...</p>;
};

export default OAuthSuccess;

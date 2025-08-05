import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import { CLIENT_ENV } from "../config/clientEnv";
import useIsDesktop from "../hooks/useDesktop";
import { useEffect } from "react";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ResetPassword from "./Auth/ResetPassword";
import DataState from "../components/ui/DataState"; // ← pour afficher un loader

const Home = () => {
    const { isAuthenticated, loginWithToken, loading } = useAuth(); // ← on récupère tout ce qu'il faut
    const isDesktop = useIsDesktop();
    const [searchParams, setSearchParams] = useSearchParams();

    const modeParam = searchParams.get("mode");
    const mode =
        isDesktop && ["login", "register", "forgot"].includes(modeParam || "")
            ? modeParam
            : null;

    const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_AUTH;
    const PICTURE = "/img/home.jpg";

    // 🔁 On déclenche loginWithToken si on ne sait pas encore si on est co
    useEffect(() => {
        if (isAuthenticated === null && !loading) {
            loginWithToken();
        }
    }, [isAuthenticated, loading, loginWithToken]);

    // 🌀 Affiche un écran de chargement pendant la vérif
    if (loading || isAuthenticated === null) {
        return <DataState loading />;
    }

    // ✅ Si connecté → Dashboard
    if (isAuthenticated) {
        return <Dashboard />;
    }

    // ⬇️ Sinon, on affiche la page d'accueil normale
    return (
        <div className="frame home-desktop">
            <div className="home-right">
                <img
                    src={`${BACKEND_URL}${PICTURE}`}
                    alt="personnes s'offrant des cadeaux"
                    className="home-picture"
                />
            </div>

            <div className="home-left">
                {isDesktop ? (
                    <>
                        {mode === "register" ? (
                            <Register />
                        ) : mode === "login" ? (
                            <Login />
                        ) : mode === "forgot" ? (
                            <ResetPassword />
                        ) : (
                            <>
                                <h1>WeGift</h1>
                                <h2>Offrir n’a jamais été aussi simple !</h2>
                                <span>
                                    Créez des moments inoubliables avec{" "}
                                    <strong>WeGift</strong>.
                                </span>
                                <button
                                    className="btn"
                                    onClick={() => handleSetMode("register")}
                                >
                                    Créer un compte
                                </button>
                                <p>
                                    Déjà inscrit ?{" "}
                                    <button
                                        className="link"
                                        onClick={() => handleSetMode("login")}
                                    >
                                        Se connecter
                                    </button>
                                </p>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <h1>WeGift</h1>
                        <h2>Offrir n’a jamais été aussi simple !</h2>
                        <span>
                            Créez des moments inoubliables avec{" "}
                            <strong>WeGift</strong>.
                        </span>
                        <Link to="/register" className="btn">
                            Créer un compte
                        </Link>
                        <p>
                            Déjà inscrit ?{" "}
                            <Link to="/login" className="link">
                                Se connecter
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );

    function handleSetMode(newMode: "login" | "register" | "forgot") {
        setSearchParams({ mode: newMode });
    }
};

export default Home;

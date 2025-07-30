import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import { CLIENT_ENV } from "../config/clientEnv";
import useIsDesktop from "../hooks/useDesktop";
import { useEffect } from "react";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ResetPassword from "./Auth/ResetPassword";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const isDesktop = useIsDesktop();
  const [searchParams, setSearchParams] = useSearchParams();

  const modeParam = searchParams.get("mode"); // "login" | "register" | null
  const mode = isDesktop
    ? modeParam === "login" ||
      modeParam === "register" ||
      modeParam === "forgot"
      ? modeParam
      : null
    : null;

  const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_AUTH;
  const PICTURE = "/img/home.jpg";

  // Retour navigateur → remet le mode à null si besoin
  useEffect(() => {
    const handlePopState = () => {
      const newMode = new URLSearchParams(window.location.search).get("mode");
      if (!newMode) {
        // on a fait "Retour" vers /
        setSearchParams({});
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setSearchParams]);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  const handleSetMode = (newMode: "login" | "register" | "forgot") => {
    setSearchParams({ mode: newMode });
  };

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
              <>
                <Register />
              </>
            ) : mode === "login" ? (
              <>
                <Login />
              </>
            ) : mode === "forgot" ? (
              <>
                <ResetPassword />
              </>
            ) : (
              <>
                <h1>WeGift</h1>
                <h2>Offrir n’a jamais été aussi simple !</h2>
                <span>
                  Créez des moments inoubliables avec <strong>WeGift</strong>.
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
              Créez des moments inoubliables avec <strong>WeGift</strong>.
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
};

export default Home;

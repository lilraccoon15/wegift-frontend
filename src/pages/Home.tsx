import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";

const Home = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Dashboard />;
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_AUTH;
    console.log(
        "🏗️ VITE_BACKEND_URL_AUTH =",
        import.meta.env.VITE_BACKEND_URL_AUTH
    );

    const PICTURE = "/img/home.jpg";

    return (
        <div className="frame">
            <img
                src={`${BACKEND_URL}${PICTURE}`}
                alt="personnes s'offrant des cadeaux"
                className="home-picture"
            />
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
        </div>
    );
};

export default Home;

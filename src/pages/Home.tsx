import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="home-visitor">
      <h1>WeGift</h1>
      <h2>Offrir n’a jamais été aussi simple.</h2>
      <span>Créez des moments inoubliables avec WeGift.</span>

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

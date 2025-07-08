import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      <h1>WeGift</h1>
      <h2>Offrir n’a jamais été aussi simple.</h2>
      <div>Créez des moments inoubliables avec notre application.</div>

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
  );
};

export default Home;

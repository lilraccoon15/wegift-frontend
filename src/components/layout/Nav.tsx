import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="mt-2 flex gap-4">
      <Link to="/">Accueil</Link>
      {isAuthenticated && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      )}
      {!isAuthenticated && (
        <>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;

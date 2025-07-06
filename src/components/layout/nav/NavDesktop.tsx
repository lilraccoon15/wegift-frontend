import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import NotificationBell from "../../../features/notifications/NotificationBell";

const NavDesktop = () => {
    const { isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    if (loading || isAuthenticated === null) {
        return null;
    }

    return (
        <nav className="mt-2 flex gap-4">
            <Link to="/">Accueil</Link>
            {isAuthenticated && (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/wishlists">
                        <i className="fa-solid fa-clipboard-list"></i> Mes
                        listes
                    </Link>
                    <NotificationBell />
                    <Link to="/my-profile">
                        <i className="fa-solid fa-user"></i> Profil
                    </Link>
                    <Link to="/account">Compte</Link>
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

export default NavDesktop;

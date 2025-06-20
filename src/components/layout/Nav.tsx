import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useManageNotifications } from "../../features/notifications/useManageNotifications";
import NotificationBell from "../../features/notifications/NotificationBell";

const Nav = () => {
    const { isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    if (loading || isAuthenticated === null) {
        return (
            <nav className="mt-2 flex gap-4">
                <p>Chargement...</p>
            </nav>
        );
    }

    return (
        <nav className="mt-2 flex gap-4">
            <Link to="/">Accueil</Link>
            {isAuthenticated && (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/my-wishlists">Mes listes</Link>
                    <Link to="/profile/me">Profil</Link>
                    <Link to="/account">Compte</Link>
                    
                    <NotificationBell />
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

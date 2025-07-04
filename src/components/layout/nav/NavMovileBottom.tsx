import { Link } from "react-router-dom";
import NotificationBell from "../../../features/notifications/NotificationBell";
import { useAuth } from "../../../context/AuthContext";

const NavMobileBottom = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading || isAuthenticated === null) {
        return null;
    }

    return (
        <nav className="nav-mobile-bottom">
            {isAuthenticated && (
                <>
                    <Link to="/dashboard" className="nav-button">
                        <i className="fa-solid fa-clipboard-list"></i>{" "}
                        <span>Espaces</span>
                    </Link>
                    <Link to="/search" className="nav-button">
                        <i className="fa-solid fa-magnifying-glass"></i>{" "}
                        <span>Recherche</span>
                    </Link>
                    <NotificationBell />
                    <Link to="/profile/me" className="nav-button">
                        <i className="fa-solid fa-user"></i> <span>Profil</span>
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavMobileBottom;

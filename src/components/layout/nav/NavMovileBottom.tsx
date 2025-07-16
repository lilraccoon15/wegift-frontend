import { Link } from "react-router-dom";
import NotificationBell from "../../../features/notifications/NotificationBell";
import { useAuth } from "../../../context/AuthContext";
import { useMyProfile } from "../../../features/profile/MyProfile/MyProfileHelpers";

const NavMobileBottom = () => {
  const { isAuthenticated, loading } = useAuth();

  const { data: user, isLoading: profileLoading } = useMyProfile();

  if (loading || isAuthenticated === null) {
    return null;
  }

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_USER;
  if (profileLoading) return null;

  return (
    <nav className="nav-mobile-bottom">
      {isAuthenticated && user && (
        <>
          <Link to="/dashboard" className="nav-button">
            <i className="fa-solid fa-clipboard-list"></i> <span>Espaces</span>
          </Link>
          <Link to="/search" className="nav-button">
            <i className="fa-solid fa-magnifying-glass"></i>{" "}
            <span>Recherche</span>
          </Link>
          <NotificationBell />
          <Link to="/my-profile" className="nav-button">
            <div
              className="profile-picture"
              style={{
                backgroundImage: `url('${
                  user.picture?.startsWith("http")
                    ? user.picture
                    : `${BACKEND_URL}${user.picture}`
                }')`,
              }}
              aria-label={`Photo de profil de ${user.pseudo}`}
            />
            <span>Profil</span>
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavMobileBottom;

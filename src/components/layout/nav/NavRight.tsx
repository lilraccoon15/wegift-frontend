import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useMyProfile } from "../../../features/profile/MyProfile/MyProfileHelpers";
import NotificationBell from "../../../features/notifications/NotificationBell";
import SearchArea from "../../../features/research/SearchArea";
import { CLIENT_ENV } from "../../../config/clientEnv";

const NavRight = () => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const { data: user, isLoading: profileLoading } = useMyProfile();

  if (loading || isAuthenticated === null || profileLoading) return null;

  const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_USER;
  const DEFAULT_PICTURE_URL = "/uploads/profilePictures/default-profile.jpg";

  return (
    <nav className="nav-header-right">
      {isAuthenticated && user && (
        <>
          <SearchArea />
          <Link
            to="/dashboard"
            className={`nav-button ${
              location.pathname.startsWith("/dashboard") ? "nav-active" : ""
            }`}
          >
            <i className="fa-solid fa-house"></i>
          </Link>

          <Link
            to="/search"
            className={`search-link nav-button ${
              location.pathname.startsWith("/search") ? "nav-active" : ""
            }`}
          >
            <i className="fa-solid fa-magnifying-glass"></i>{" "}
          </Link>
          <NotificationBell />
          <Link
            to="/my-profile"
            className={`nav-button ${
              location.pathname.startsWith("/my-profile") ? "nav-active" : ""
            }`}
          >
            <div
              className="profile-picture"
              style={{
                backgroundImage: `url('${
                  user.picture?.startsWith("http")
                    ? user.picture
                    : user.picture
                    ? `${BACKEND_URL}${user.picture}`
                    : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
                }')`,
              }}
              aria-label={`Photo de profil de ${user.pseudo}`}
            />
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavRight;

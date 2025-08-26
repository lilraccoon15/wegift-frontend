import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useMyProfile } from "../../../features/profile/MyProfile/MyProfileHelpers";
import NotificationBell from "../../../features/notifications/NotificationBell";
import SearchArea from "../../../features/research/SearchArea";
import { CLIENT_ENV } from "../../../config/clientEnv";
import { useState, useEffect, useRef } from "react";

const NavRight = () => {
  const location = useLocation();
  const { isAuthenticated, loading, logout } = useAuth();
  const { data: user, isLoading: profileLoading } = useMyProfile();
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const isMobile = window.innerWidth < 1024;
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>

          <NotificationBell />

          {isMobile ? (
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
          ) : (
            <>
              <div
                className={`nav-button ${
                  location.pathname.startsWith("/my-profile")
                    ? "nav-active"
                    : ""
                }`}
                ref={menuRef}
                onClick={() => setShowOptions((prev) => !prev)}
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
              </div>
              {showOptions && (
                <div className="options-menu">
                  <button>
                    <a href="/my-profile">Mon profil</a>
                  </button>
                  <button>
                    <a href="/account">Mon compte</a>
                  </button>
                  <button onClick={handleLogout} className="logout">
                    Déconnexion
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </nav>
  );
};

export default NavRight;

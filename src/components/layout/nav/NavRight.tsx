import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import NotificationBell from "../../../features/notifications/NotificationBell";
import SearchArea from "../../../features/research/SearchArea";
import { useState, useEffect, useRef } from "react";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../../config/constants";

const NavRight = () => {
  const location = useLocation();
  const { isAuthenticated, loading, logout, user } = useAuth();
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

  if (loading) return null;

  console.log(user);
  // todo g perdu mes infos snif

  const profilePicture = user?.picture?.startsWith("http")
    ? user.picture
    : user?.picture
    ? `${BACKEND_URLS.user}${user.picture}`
    : `${BACKEND_URLS.user}${DEFAULT_PICTURES.user}`;

  const pseudo = user?.pseudo || "Utilisateur";

  return (
    <nav className="nav-header-right">
      {isAuthenticated && (
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
                style={{ backgroundImage: `url('${profilePicture}')` }}
                aria-label={`Photo de profil de ${pseudo}`}
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
                  style={{ backgroundImage: `url('${profilePicture}')` }}
                  aria-label={`Photo de profil de ${pseudo}`}
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

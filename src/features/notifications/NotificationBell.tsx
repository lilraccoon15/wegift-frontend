import { Link, useLocation } from "react-router-dom";
import Notifications from "../../pages/Notifications/Notifications";
import { useMyNotifications } from "./NotificationHelpers";
import { useManageNotifications } from "./useManageNotifications";
import { useMyProfile } from "../profile/MyProfile/MyProfileHelpers";
import { useEffect, useRef } from "react";

const NotificationBell = () => {
  const location = useLocation();
  const { showNotifications, setShowNotifications } = useManageNotifications();

  const { data: user, isLoading: profileLoading } = useMyProfile();

  const {
    data: notifications,
    error,
    isLoading: loading,
  } = useMyNotifications(user?.id, {
    enabled: !!user?.id,
  });

  const notifRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        showNotifications &&
        notifRef.current &&
        !notifRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, setShowNotifications]);

  if (profileLoading || loading) return null;
  if (error) return <p>Erreur : {error.message}</p>;

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <>
      <button
        ref={buttonRef}
        className={`notification-popup nav-button ${
          showNotifications ? "nav-active" : ""
        }`}
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <div className="notification-icon-wrapper">
          <i className="fa-solid fa-bell"></i>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </div>
      </button>

      <Link
        to="/notifications"
        className={`notification-link nav-button ${
          location.pathname.startsWith("/notifications") ? "nav-active" : ""
        }`}
      >
        <div className="notification-icon-wrapper">
          <i className="fa-solid fa-bell"></i>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </div>
      </Link>

      {showNotifications && (
        <div className="notifications-content" ref={notifRef}>
          <Notifications />
        </div>
      )}
    </>
  );
};

export default NotificationBell;

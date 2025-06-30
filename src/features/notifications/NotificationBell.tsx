import { Link } from "react-router-dom";
import Notifications from "../../pages/Notifications/Notifications";
import { useMyNotifications } from "./NotificationHelpers";
import { useManageNotifications } from "./useManageNotifications";

const NotificationBell = () => {
    const { showNotifications, setShowNotifications } =
        useManageNotifications();

    const {
        data: notifications,
        error,
        isLoading: loading,
    } = useMyNotifications();

    const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

    if (loading) return null;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <button
                className="notification-popup"
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <i className="fa-solid fa-bell"></i>
                {unreadCount > 0 && <span>{unreadCount}</span>}
            </button>

            <Link to="/notifications" className="notification-link nav-button">
                <i className="fa-solid fa-bell"></i>
                {unreadCount > 0 && <span>{unreadCount}</span>}
                <span>Notifications</span>
            </Link>

            {showNotifications && (
                <>
                    <Notifications />
                </>
            )}
        </>
    );
};

export default NotificationBell;

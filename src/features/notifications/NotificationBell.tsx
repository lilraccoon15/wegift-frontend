import { Link } from "react-router-dom";
import Notifications from "../../pages/Notifications/Notifications";
import { useMyNotifications } from "./NotificationHelpers";
import { useManageNotifications } from "./useManageNotifications";
import { useMyProfile } from "../profile/MyProfile/MyProfileHelpers";

const NotificationBell = () => {
    const { showNotifications, setShowNotifications } =
        useManageNotifications();

    const { data: user, isLoading: profileLoading } = useMyProfile();

    const {
        data: notifications,
        error,
        isLoading: loading,
    } = useMyNotifications(user?.id, {
        enabled: !!user?.id,
    });

    if (profileLoading || loading) return null;
    if (error) return <p>Erreur : {error.message}</p>;

    const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

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
                <div className="notification-icon-wrapper">
                    <i className="fa-solid fa-bell"></i>
                    {unreadCount > 0 && (
                        <span className="notification-badge">
                            {unreadCount}
                        </span>
                    )}
                </div>
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

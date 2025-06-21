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

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <button onClick={() => setShowNotifications(!showNotifications)}>
                🔔
                {unreadCount > 0 && <span>{unreadCount}</span>}
            </button>

            {showNotifications && (
                <>
                    {notifications && notifications.length > 0 ? (
                        <ul>
                            {notifications.map((notif) => (
                                <li key={notif.id}>
                                    {notif.read ? "" : "🔵 "}{" "}
                                    {/* petit indicateur non lu */}
                                    {notif.text}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Vous n'avez pas de notification</p>
                    )}
                </>
            )}
        </>
    );
};

export default NotificationBell;

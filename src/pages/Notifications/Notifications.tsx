import { useMyNotifications } from "../../features/notifications/NotificationHelpers";

const Notifications = () => {
    const { data: notifications, error } = useMyNotifications();

    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div>
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
        </div>
    );
};

export default Notifications;

import { useMyNotifications } from "../../features/notifications/NotificationHelpers";
import { useMyProfile } from "../../features/profile/MyProfile/MyProfileHelpers";

const Notifications = () => {
    const {
        data: user,
        isLoading: profileLoading,
        error: profileError,
    } = useMyProfile();
    const userId = user?.id;

    const {
        data: notifications,
        error: notifError,
        isLoading: notifLoading,
    } = useMyNotifications(userId, { enabled: !!userId });

    if (profileLoading || notifLoading) return null;
    if (profileError) return <p>Erreur profil : {profileError.message}</p>;
    if (notifError) return <p>Erreur notifications : {notifError.message}</p>;

    const sortedNotifications = notifications
        ? notifications.slice().sort((a, b) => {
              if (a.read === b.read) return 0;
              return a.read ? 1 : -1;
          })
        : [];

    return (
        <div>
            {sortedNotifications.length > 0 ? (
                <ul>
                    {sortedNotifications.map((notif) => (
                        <li key={notif.id}>
                            {!notif.read && "🔵 "} {notif.type?.text || ""}
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

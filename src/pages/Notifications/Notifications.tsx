import NotificationItem from "../../features/notifications/NotificationItem";
import { useManageNotificationData } from "../../features/notifications/useManageNotificationData";
import { useMyProfile } from "../../features/profile/MyProfile/MyProfileHelpers";

const Notifications = () => {
    const {
        data: user,
        isLoading: profileLoading,
        error: profileError,
    } = useMyProfile();
    const userId = user?.id;

    const {
        notifications,
        error: notifError,
        isLoading: notifLoading,
    } = useManageNotificationData(userId);

    if (profileLoading || notifLoading) return null;
    if (profileError) return <p>Erreur profil : {profileError.message}</p>;
    if (notifError) return <p>Erreur notifications : {notifError}</p>;

    return (
        <div>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notif) => (
                        <NotificationItem key={notif.id} notif={notif} />
                    ))}
                </ul>
            ) : (
                <p>Vous n'avez pas de notification</p>
            )}
        </div>
    );
};

export default Notifications;

import NotificationItem from "../../features/notifications/NotificationItem";
import { useManageNotificationData } from "../../features/notifications/useManageNotificationData";
import DataState from "../../components/ui/DataState";
import { useCombinedState } from "../../hooks/useCombineState";
import BackButton from "../../components/ui/BackButton";
import { useAuth } from "../../context/AuthContext";

const Notifications = () => {
  const { user, loading: authLoading } = useAuth();

  const {
    notifications,
    isLoading: notifLoading,
    error: notifError,
  } = useManageNotificationData(user?.id);

  const { loading, error } = useCombinedState([
    { loading: authLoading },
    { loading: notifLoading, error: notifError },
  ]);

  return (
    <DataState loading={loading} error={error}>
      <div className="title-return notification-title">
        <BackButton />
        <h1>Notifications</h1>
      </div>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notif) => (
            <NotificationItem key={notif.id} notif={notif} />
          ))}
        </ul>
      ) : (
        <p>Vous n'avez pas de notification</p>
      )}
    </DataState>
  );
};

export default Notifications;

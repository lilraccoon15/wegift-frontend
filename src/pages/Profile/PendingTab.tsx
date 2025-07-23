import { Link } from "react-router-dom";
import ActionButtons from "../../components/ui/ActionButtons";
import {
  useCancelFriendRequest,
  useRespondToFriendRequest,
} from "../../features/profile/MyProfile/MyProfileHelpers";

interface Props {
  pending: {
    profile: {
      id: string;
      pseudo: string;
      picture?: string | null;
    };
    direction: "sent" | "received";
  }[];
  backendUrl: string;
  defaultPictureUrl: string;
}

const PendingTab = ({ pending, backendUrl, defaultPictureUrl }: Props) => {
  const { mutate: cancelFriendRequest, isPending: isCancelling } =
    useCancelFriendRequest();

  const { mutate: respondToFriendRequest } = useRespondToFriendRequest();

  return (
    <ul className="pending-list">
      {pending.map(({ profile, direction }) => (
        <li key={profile.id}>
          <Link to={`/profile/${profile.id}`}>
            <div
              className="profile-picture"
              style={{
                backgroundImage: `url('${
                  profile.picture?.startsWith("http")
                    ? profile.picture
                    : profile.picture
                    ? `${backendUrl}${profile.picture}`
                    : `${backendUrl}${defaultPictureUrl}`
                }')`,
              }}
              aria-label={`Photo de ${profile.pseudo}`}
            />
          </Link>
          <div className="pending-details">
            <Link to={`/profile/${profile.id}`}>
              <span className="pending-text">{profile.pseudo}</span>
            </Link>

            {direction === "received" ? (
              <ActionButtons
                status="pending_received"
                onAccept={() =>
                  respondToFriendRequest({
                    requesterId: profile.id,
                    action: "accept",
                  })
                }
                onDecline={() =>
                  respondToFriendRequest({
                    requesterId: profile.id,
                    action: "reject",
                  })
                }
                variant="friendship"
              />
            ) : (
              <ActionButtons
                status="pending_sent"
                isSubmitting={isCancelling}
                onDecline={() => cancelFriendRequest(profile.id)}
                variant="friendship"
              />
            )}
            {/* TODO : vérifier qu'on a bien la modale êtes-vous sûr ? */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PendingTab;

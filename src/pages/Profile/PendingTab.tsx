import { Link } from "react-router-dom";
import ActionButtons from "../../components/ui/ActionButtons";
import {
  useCancelFriendRequest,
  useRespondToFriendRequest,
} from "../../features/profile/MyProfile/MyProfileHelpers";
import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";

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

  const [pendingCancelId, setPendingCancelId] = useState<string | null>(null);

  return (
    <>
      <div className="frame">
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
                    onCancel={() => setPendingCancelId(profile.id)}
                    variant="friendship"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {pendingCancelId && (
        <ConfirmModal
          title="Annuler la demande"
          message="Souhaitez-vous vraiment supprimer cette demande d’ami ?"
          onClose={() => setPendingCancelId(null)}
          onConfirm={() => {
            cancelFriendRequest(pendingCancelId);
            setPendingCancelId(null);
          }}
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
        />
      )}
    </>
  );
};

export default PendingTab;

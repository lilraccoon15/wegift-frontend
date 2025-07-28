import { Link } from "react-router-dom";
import { useDeleteFriend } from "../../features/profile/MyProfile/MyProfileHelpers";
import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";

interface Props {
  friends: { id: string; pseudo: string; picture?: string | null }[];
  backendUrl: string;
  defaultPictureUrl: string;
}

const FriendsTab = ({ friends, backendUrl, defaultPictureUrl }: Props) => {
  const { mutate: deleteFriend } = useDeleteFriend();

  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);

  return (
    <>
      <div className="frame">
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend.id}>
              <Link to={`/profile/${friend.id}`}>
                <div>
                  <div
                    className="profile-picture"
                    style={{
                      backgroundImage: `url('${
                        friend.picture?.startsWith("http")
                          ? friend.picture
                          : friend.picture
                          ? `${backendUrl}${friend.picture}`
                          : `${backendUrl}${defaultPictureUrl}`
                      }')`,
                    }}
                    aria-label={`Photo de ${friend.pseudo}`}
                  />
                  <span>{friend.pseudo}</span>
                </div>
              </Link>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setFriendToDelete(friend.id)}
              ></i>
            </li>
          ))}
        </ul>
      </div>

      {friendToDelete && (
        <ConfirmModal
          title="Supprimer un(e) ami(e)"
          message="Souhaitez-vous vraiment supprimer cette personne de vos amis ?"
          onClose={() => setFriendToDelete(null)}
          onConfirm={() => {
            deleteFriend(friendToDelete);
            setFriendToDelete(null);
          }}
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
        />
      )}
    </>
  );
};

export default FriendsTab;

import { Link } from "react-router-dom";
import { useManageViewProfile } from "../../features/profile/ViewProfile/useManageViewProfile";
import { useFriends } from "../../features/profile/ViewProfile/ViewProfileHelpers";
import { useWishlists } from "../../features/wishlists/UserWishlists/UserWishlistsHelpers";
import Wishlists from "../Wishlists/Wishlists";
import DataState from "../../components/ui/DataState";
import { useCombinedState } from "../../hooks/useCombineState";
import BackButton from "../../components/ui/BackButton";

const ViewProfile = () => {
  const {
    error,
    currentUser,
    user,
    friendshipStatus,
    handleAddFriend,
    isSubmitting,
    loading: loadingUser,
  } = useManageViewProfile();

  const {
    data: friends,
    error: friendsError,
    isLoading: loadingFriends,
  } = useFriends(user?.id);

  const {
    data: wishlists,
    error: errorWishlists,
    isLoading: loadingWishlists,
  } = useWishlists(user?.id);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_USER;
  const DEFAULT_PICTURE_URL = "/uploads/profilePictures/default-profile.jpg";

  const { loading, error: combinedError } = useCombinedState([
    { loading: loadingUser, error },
    { loading: loadingFriends, error: friendsError },
    { loading: loadingWishlists, error: errorWishlists },
  ]);

  const renderFriendButton = () => {
    if (!currentUser || !user) return null;

    switch (friendshipStatus) {
      case "none":
        return (
          <button
            className="btn"
            disabled={isSubmitting}
            onClick={handleAddFriend}
          >
            {isSubmitting
              ? "Envoi en cours..."
              : "Envoyer une demande d'amitié"}
          </button>
        );
      case "pending_sent":
        return (
          <div className="btn btn-friendship-status">
            Demande d’amitié envoyée
          </div>
        );
      case "pending_received":
        return (
          <div className="btn btn-friendship-status">
            Cette personne vous a envoyé une demande
          </div>
        );
      case "friends":
        return <div className="btn btn-friendship-status">Vous êtes amis</div>;
      case "rejected":
        return <div className="btn btn-friendship-status">Demande refusée</div>;
      default:
        return null;
    }
  };

  return (
    <DataState loading={loading} error={combinedError}>
      {user && (
        <>
          <div className="title-return">
            <BackButton />
            <h1>Profil</h1>
          </div>
          <div className="profile-top">
            <div
              className="profile-picture"
              style={{
                backgroundImage: `url('${
                  user.picture?.startsWith("http")
                    ? user.picture
                    : user.picture
                    ? `${BACKEND_URL}${user.picture}`
                    : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
                }')`,
              }}
            />
            <div className="profile-details">
              <h2>{user.pseudo}</h2>
              <div className="profile-numbers">
                <div>
                  {friends && (
                    <Link to={`/friends/${user.id}`}>
                      {friends.length} ami
                      {friends.length > 1 ? "s" : ""}
                    </Link>
                  )}
                </div>
                <div>
                  {wishlists && (
                    <span>
                      {wishlists.length} wishlist
                      {wishlists.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-bottom">
            <div className="profile-infos">
              <div className="birthday">
                <i className="fa-solid fa-cake-candles"></i> {user.birthDate}
              </div>
              <div className="description">{user.description}</div>
            </div>
            {renderFriendButton()}
          </div>

          <Wishlists />
        </>
      )}
    </DataState>
  );
};

export default ViewProfile;

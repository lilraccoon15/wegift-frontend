import { Link } from "react-router-dom";
import { useManageViewProfile } from "../../features/profile/ViewProfile/useManageViewProfile";
import Wishlists from "../Wishlists/Wishlists";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import ActionButtons from "../../components/ui/ActionButtons";
import Modal from "../../components/ui/Modal";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

const ViewProfile = () => {
  const {
    error,
    user,
    friendshipStatus,
    handleAddFriend,
    isSubmitting,
    loading,
    handleCancelFriendRequest,
    handleAcceptFriendRequest,
    handleDeclineFriendRequest,
    wishlists,
    friends,
    setShowActionsMenu,
    showActionsMenu,
    handleRemoveFriend,
  } = useManageViewProfile();

  // TODO :
  // - bouton signaler pour utilisateur
  // - bouton supprimer pour admin
  return (
    <DataState loading={loading} error={error}>
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
                    ? `${BACKEND_URLS.user}${user.picture}`
                    : `${BACKEND_URLS.user}${DEFAULT_PICTURES.user}`
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
            <ActionButtons
              status={friendshipStatus}
              isSubmitting={isSubmitting}
              onAdd={handleAddFriend}
              onCancel={handleCancelFriendRequest}
              onAccept={handleAcceptFriendRequest}
              onDecline={handleDeclineFriendRequest}
              onToggleMenu={() => setShowActionsMenu((prev) => !prev)}
              showMenu={showActionsMenu}
              variant="friendship"
            />
          </div>

          {showActionsMenu && (
            <Modal onClose={() => setShowActionsMenu(false)}>
              <div className="modal-body">
                <p>
                  Souhaitez-vous vraiment supprimer {user.pseudo} de vos amis ?
                </p>
                <div className="modal-buttons">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowActionsMenu(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleRemoveFriend}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </Modal>
          )}

          <Wishlists />
        </>
      )}
    </DataState>
  );
};

export default ViewProfile;

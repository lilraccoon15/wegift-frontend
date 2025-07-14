import { Link } from "react-router-dom";
import { useManageViewProfile } from "../../features/profile/ViewProfile/useManageViewProfile";
import { useFriends } from "../../features/profile/ViewProfile/ViewProfileHelpers";
import { useWishlists } from "../../features/wishlists/UserWishlists/UserWishlistsHelpers";
import Wishlists from "../Wishlists/Wishlists";
import DataState from "../../components/ui/DataState";
import { useCombinedState } from "../../hooks/useCombineState";

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
    const DEFAULT_PICTURE_URL = "/default-profile.png";

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
                    <button disabled={isSubmitting} onClick={handleAddFriend}>
                        {isSubmitting
                            ? "Envoi en cours..."
                            : "Envoyer une demande d'amitié"}
                    </button>
                );
            case "pending_sent":
                return <p>Demande d’amitié envoyée</p>;
            case "pending_received":
                return <p>Cette personne vous a envoyé une demande</p>;
            case "friends":
                return <p>Vous êtes amis</p>;
            case "rejected":
                return <p>Demande refusée</p>;
            default:
                return null;
        }
    };

    return (
        <DataState loading={loading} error={combinedError}>
            {user && (
                <>
                    {renderFriendButton()}

                    <div className="profile-top">
                        <img
                            src={
                                user.picture?.startsWith("http")
                                    ? user.picture
                                    : user.picture
                                    ? `${BACKEND_URL}${user.picture}`
                                    : DEFAULT_PICTURE_URL
                            }
                            alt="Photo de profil"
                            className="profile-picture"
                        />
                        <div className="profile-details">
                            <div>{user.pseudo}</div>
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
                        <div>
                            <div>{user.birthDate}</div>
                            <div>{user.description}</div>
                        </div>
                    </div>

                    <Wishlists />
                </>
            )}
        </DataState>
    );
};

export default ViewProfile;

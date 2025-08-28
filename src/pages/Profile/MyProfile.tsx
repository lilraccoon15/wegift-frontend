import { Link } from "react-router-dom";
import { useMyFriends } from "../../features/profile/MyProfile/MyProfileHelpers";
import { useMyWishlists } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import DataState from "../../components/ui/DataState";
import { useCombinedState } from "../../hooks/useCombineState";
import BackButton from "../../components/ui/BackButton";
import Spaces from "../../features/profile/Spaces";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";
import { useAuth } from "../../context/AuthContext";

const MyProfile = () => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: friends,
    error: errorFriends,
    isLoading: loadingFriends,
  } = useMyFriends();

  const {
    data: wishlists,
    error: errorWishlists,
    isLoading: loadingWishlists,
  } = useMyWishlists();

  const { loading, error } = useCombinedState([
    { loading: authLoading },
    { loading: loadingFriends, error: errorFriends },
    { loading: loadingWishlists, error: errorWishlists },
  ]);

  return (
    <DataState loading={loading} error={error}>
      {user && (
        <>
          <div className="title-return">
            <BackButton />
            <h1>Mon profil</h1>
            <Link to="/account" className="actions">
              <i className="fa-solid fa-gear"></i>
            </Link>
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
                    <Link to="/my-friends">
                      {friends.length} ami
                      {friends.length > 1 ? "s" : ""}
                    </Link>
                  )}
                </div>
                <div>
                  {wishlists && (
                    <Link to="/my-wishlists">
                      {wishlists.length} wishlist
                      {wishlists.length > 1 ? "s" : ""}
                    </Link>
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
            <div className="profile-buttons">
              <Link to="/edit-profile" className="btn">
                Modifier mon profil
              </Link>
              <Link to="/account" className="btn btn-account-desktop">
                Modifier mon compte
              </Link>
            </div>
          </div>
          <Spaces />
        </>
      )}
    </DataState>
  );
};

export default MyProfile;

import { Link } from "react-router-dom";
import {
    useMyFriends,
    useMyProfile,
} from "../../features/profile/MyProfile/MyProfileHelpers";
import { useMyWishlists } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import Dashboard from "../Dashboard";
import DataState from "../../components/ui/DataState";
import { useCombinedState } from "../../hooks/useCombineState";
import BackButton from "../../components/ui/BackButton";

const MyProfile = () => {
    const {
        data: user,
        error: errorUser,
        isLoading: loadingUser,
    } = useMyProfile();

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

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_USER;
    const DEFAULT_PICTURE_URL = "/uploads/profilePictures/default-profile.jpg";

    const { loading, error } = useCombinedState([
        { loading: loadingUser, error: errorUser },
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
                    </div>
                    <div className="profile-top">
                        <img
                            src={
                                user.picture?.startsWith("http")
                                    ? user.picture
                                    : user.picture
                                    ? `${BACKEND_URL}${user.picture}`
                                    : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
                            }
                            alt="Photo de profil"
                            className="profile-picture"
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
                                <i className="fa-solid fa-cake-candles"></i>{" "}
                                {user.birthDate}
                            </div>
                            <div className="description">
                                {user.description}
                            </div>
                        </div>
                        <Link to="/edit-profile" className="btn">
                            Modifier mon profil
                        </Link>
                    </div>
                    <Dashboard />
                </>
            )}
        </DataState>
    );
};

export default MyProfile;

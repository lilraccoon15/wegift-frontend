import { Link } from "react-router-dom";
import {
    useMyFriends,
    useMyProfile,
} from "../../features/profile/MyProfile/MyProfileHelpers";
import { useState } from "react";

const MyProfile = () => {
    const { data: user, error } = useMyProfile();

    const { data: friends, error: friendsError } = useMyFriends();

    const [showFriendsList, setShowFriendsList] = useState(false);

    if (error) return <p>Erreur : {error.message}</p>;
    if (friendsError) return <p>Erreur amis : {friendsError.message}</p>;

    return (
        <>
            {user && <h2>Profile {user.firstName}</h2>}
            {friends ? (
                <>
                    <p
                        style={{
                            cursor: friends.length > 0 ? "pointer" : "default",
                            userSelect: "none",
                        }}
                        onClick={() =>
                            friends.length > 0 &&
                            setShowFriendsList(!showFriendsList)
                        }
                    >
                        {friends.length} ami{friends.length > 1 ? "s" : ""}
                    </p>

                    {showFriendsList && friends.length > 0 && (
                        <ul>
                            {friends.map((friend) => (
                                <Link
                                    key={friend.id}
                                    to={`/profile/${friend.id}`}
                                >
                                    <li key={friend.id}>
                                        {friend.firstName} {friend.lastName}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <p>Chargement des amis...</p>
            )}
            <Link to="/edit-profile">Modifier mon profil</Link>
        </>
    );
};

export default MyProfile;

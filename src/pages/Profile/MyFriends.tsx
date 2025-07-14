import { Link } from "react-router-dom";
import { useMyFriends } from "../../features/profile/MyProfile/MyProfileHelpers";
import DataState from "../../components/ui/DataState";

const MyFriends = () => {
    const { data: friends, error, isLoading } = useMyFriends();

    return (
        <DataState loading={isLoading} error={error}>
            {!friends || friends.length === 0 ? (
                <p>Vous n'avez pas encore d'amis 🥲</p>
            ) : (
                <div>
                    <h2>Mes amis</h2>
                    <ul>
                        {friends.map((friend) => (
                            <li key={friend.id}>
                                <Link to={`/profile/${friend.id}`}>
                                    {friend.pseudo}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </DataState>
    );
};

export default MyFriends;

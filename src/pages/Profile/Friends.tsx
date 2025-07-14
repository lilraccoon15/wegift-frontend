import { Link, useParams } from "react-router-dom";
import { useFriends } from "../../features/profile/ViewProfile/ViewProfileHelpers";
import DataState from "../../components/ui/DataState";

const Friends = () => {
    const { id } = useParams();
    const { data: friends, error, isLoading } = useFriends(id as string);

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

export default Friends;

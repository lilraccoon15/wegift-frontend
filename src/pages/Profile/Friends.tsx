import { Link, useParams } from "react-router-dom";
import {
  useFriends,
  useProfile,
} from "../../features/profile/ViewProfile/ViewProfileHelpers";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import { useCombinedState } from "../../hooks/useCombineState";
import { useMyFriends } from "../../features/profile/MyProfile/MyProfileHelpers";

const Friends = () => {
  const { id } = useParams();
  const {
    data: friends,
    error: errorFriends,
    isLoading,
  } = useFriends(id as string);

  const {
    data: user,
    error: errorUser,
    isLoading: loadingUser,
  } = useProfile(id as string);

  const {
    data: myFriends,
    error: errorMyFriends,
    isLoading: loadingMyFriends,
  } = useMyFriends();

  const myFriendIds = new Set(myFriends?.map((f) => f.id));

  const { loading, error } = useCombinedState([
    { loading: loadingUser, error: errorUser },
    { loading: isLoading, error: errorFriends },
    { loading: loadingMyFriends, error: errorMyFriends },
  ]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_USER;
  const DEFAULT_PICTURE_URL = "/uploads/profilePictures/default-profile.jpg";

  return (
    <DataState loading={loading} error={error}>
      <div className="title-return">
        <BackButton />
        <h1>Amis de {user?.pseudo}</h1>
      </div>
      {!friends || friends.length === 0 ? (
        <p>{user?.pseudo} n'a pas encore d'amis</p>
      ) : (
        <div>
          <ul className="friend-list">
            {friends.map((friend) => {
              const isMutual = myFriendIds.has(friend.id);
              return (
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
                              ? `${BACKEND_URL}${friend.picture}`
                              : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
                          }')`,
                        }}
                        aria-label={`Photo de ${friend.pseudo}`}
                      />
                      <span>{friend.pseudo}</span>
                    </div>
                  </Link>
                  {isMutual && <p>Ami en commun</p>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </DataState>
  );
};

export default Friends;

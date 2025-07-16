import { Link } from "react-router-dom";
import { useMyFriends } from "../../features/profile/MyProfile/MyProfileHelpers";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";

const MyFriends = () => {
  const { data: friends, error, isLoading } = useMyFriends();
  console.log(friends);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_USER;
  const DEFAULT_PICTURE_URL = "/uploads/profilePictures/default-profile.jpg";

  return (
    <DataState loading={isLoading} error={error}>
      {!friends || friends.length === 0 ? (
        <p>Vous n'avez pas encore d'amis</p>
      ) : (
        <div>
          <div className="title-return">
            <BackButton />
            <h1>Mes amis</h1>
          </div>
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
                            ? `${BACKEND_URL}${friend.picture}`
                            : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
                        }')`,
                      }}
                      aria-label={`Photo de ${friend.pseudo}`}
                    />

                    <span>{friend.pseudo}</span>
                  </div>
                </Link>
                <i className="fa-solid fa-xmark"></i>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DataState>
  );
};

export default MyFriends;

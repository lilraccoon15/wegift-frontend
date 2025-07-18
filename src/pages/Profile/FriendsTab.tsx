import { Link } from "react-router-dom";

interface Props {
  friends: { id: string; pseudo: string; picture?: string | null }[];
  backendUrl: string;
  defaultPictureUrl: string;
}

const FriendsTab = ({ friends, backendUrl, defaultPictureUrl }: Props) => {
  return (
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
                      ? `${backendUrl}${friend.picture}`
                      : `${backendUrl}${defaultPictureUrl}`
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
  );
};

export default FriendsTab;

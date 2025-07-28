import { useRef, useState } from "react";
import type { User } from "../../features/profile/ViewProfile/ViewProfileHelpers";
import { useMyFriends } from "../../features/profile/MyProfile/MyProfileHelpers";

interface FriendTagInputProps {
  participants: User[];
  setParticipants: (users: User[]) => void;
}

const FriendTagInput: React.FC<FriendTagInputProps> = ({
  participants,
  setParticipants,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: friends = [], isLoading } = useMyFriends();

  const filteredSuggestions = friends.filter((user) => {
    const alreadySelected = participants.some((u) => u.id === user.id);
    const matchesQuery = user.pseudo
      .toLowerCase()
      .includes(query.toLowerCase());
    return !alreadySelected && matchesQuery;
  });

  const addUser = (user: User) => {
    if (participants.length >= 15) return;
    setParticipants([...participants, user]);
    setQuery("");
  };

  const removeUser = (id: string) => {
    setParticipants(participants.filter((u) => u.id !== id));
  };

  const DEFAULT_PICTURE_URL_USER =
    "/uploads/profilePictures/default-profile.jpg";
  const BACKEND_URL_USER = import.meta.env.VITE_BACKEND_URL_USER;

  return (
    <>
      <label htmlFor="collaborators">Collaborateurs :</label>
      <div className="tag-input" onClick={() => inputRef.current?.focus()}>
        {participants.map((user) => (
          <span className="tag" key={user.id}>
            {user.pseudo}
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeUser(user.id)}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id="collaborators"
          name="collaborators"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ajouter des amis..."
          disabled={isLoading}
          className="tag-input-field"
        />
      </div>
      <div className="friend-tag-list">
        {query.length > 0 && filteredSuggestions.length > 0 && (
          <ul>
            {filteredSuggestions.map((user) => (
              <li key={user.id} onClick={() => addUser(user)}>
                <div
                  className="profile-picture"
                  style={{
                    backgroundImage: `url('${
                      user.picture?.startsWith("blob:")
                        ? user.picture
                        : user.picture?.startsWith("http")
                        ? user.picture
                        : `${BACKEND_URL_USER}${
                            user.picture ?? DEFAULT_PICTURE_URL_USER
                          }`
                    }')`,
                  }}
                />
                {user.pseudo}
              </li>
            ))}
          </ul>
        )}
        {query.length > 1 &&
          filteredSuggestions.length === 0 &&
          friends.length > 0 && <p>Aucun ami trouvé pour « {query} »</p>}
      </div>
    </>
  );
};

export default FriendTagInput;

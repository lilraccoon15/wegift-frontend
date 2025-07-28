import { useRef } from "react";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import FriendTagInput from "../../../components/forms/FriendTagInput";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";

interface CreateWishlistFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  onTitleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onPictureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  onDescriptionChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  picturePreview?: string | null;
  access: string;
  onAccessChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode: string;
  onModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  buttondisabled: boolean;
  participants: User[];
  setParticipants: React.Dispatch<React.SetStateAction<User[]>>;
}

const CreateWishlistForm: React.FC<CreateWishlistFormProps> = ({
  onSubmit,
  title,
  onTitleChange,
  onPictureChange,
  description,
  onDescriptionChange,
  picturePreview,
  access,
  onAccessChange,
  error,
  buttondisabled,
  mode,
  onModeChange,
  participants,
  setParticipants,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

  const DEFAULT_PICTURE_URL = "/uploads/wishlistPictures/default-wishlist.png";

  return (
    <>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label htmlFor="title">
          Titre{" "}
          <span className="required-marker" aria-hidden="true">
            *
          </span>{" "}
          : <span className="sr-only">(obligatoire)</span>
        </label>
        <InputField
          id="title"
          name="title"
          type="text"
          placeholder="Titre"
          value={title}
          onChange={onTitleChange}
          required
        />
        <label htmlFor="picture">Image de couverture :</label>
        <img
          src={
            picturePreview
              ? picturePreview.startsWith("blob:")
                ? picturePreview
                : `${BACKEND_URL}${picturePreview}`
              : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
          }
          alt="Photo de couverture"
          onClick={handlePictureClick}
          className="picture-form"
        />
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onPictureChange}
        />
        <label htmlFor="description">Description :</label>
        <InputField
          id="description"
          name="description"
          isTextArea
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
        />
        <label>Rendre privée ?</label>
        <ToggleSwitch
          name="wishlistAccess"
          checked={access === "private"}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            onAccessChange({
              ...e,
              target: {
                ...target,
                value: target.checked ? "private" : "public",
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        />
        <label>Inviter des amis à collaborer ?</label>
        <ToggleSwitch
          name="wishlistMode"
          checked={mode === "collaborative"}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const newValue = target.checked ? "collaborative" : "individual";
            onModeChange({
              ...e,
              target: {
                ...target,
                value: newValue,
              },
            } as React.ChangeEvent<HTMLInputElement>);

            if (newValue === "individual") {
              setParticipants([]);
            }
          }}
        />
        {mode == "collaborative" && (
          <FriendTagInput
            participants={participants}
            setParticipants={setParticipants}
          />
        )}
        {error && <Message text={error} type="error" />}
        <Button type="submit" disabled={buttondisabled}>
          Créer ma liste de souhaits
        </Button>
      </form>
    </>
  );
};

export default CreateWishlistForm;

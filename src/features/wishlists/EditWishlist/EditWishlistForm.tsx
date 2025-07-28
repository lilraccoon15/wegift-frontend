import { useRef } from "react";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import FriendTagInput from "../../../components/forms/FriendTagInput";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";

interface EditWishlistFormProps {
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
  published: string;
  onPublishedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  buttondisabled: boolean;
  mode: string;
  onModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  participants: User[];
  setParticipants: React.Dispatch<React.SetStateAction<User[]>>;
}

const EditWishlistForm: React.FC<EditWishlistFormProps> = ({
  onSubmit,
  title,
  onTitleChange,
  onPictureChange,
  description,
  onDescriptionChange,
  picturePreview,
  access,
  onAccessChange,
  published,
  onPublishedChange,
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
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <InputField
        type="text"
        placeholder="Titre"
        value={title}
        onChange={onTitleChange}
        required
      />
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
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onPictureChange}
      />
      <InputField
        type="text"
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
          onModeChange({
            ...e,
            target: {
              ...target,
              value: target.checked ? "collaborative" : "individual",
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      {mode == "collaborative" && (
        <FriendTagInput
          participants={participants}
          setParticipants={setParticipants}
        />
      )}
      <label>Archiver ?</label>
      <ToggleSwitch
        name="wishlistStatus"
        checked={published === "0"}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          onPublishedChange({
            ...e,
            target: {
              ...target,
              value: target.checked ? "0" : "1",
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
      />

      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={buttondisabled}>
        Modifier
      </Button>
    </form>
  );
};

export default EditWishlistForm;

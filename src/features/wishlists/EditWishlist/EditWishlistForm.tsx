import { useRef } from "react";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import FriendTagInput from "../../../components/forms/FriendTagInput";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";
import { CLIENT_ENV } from "../../../config/clientEnv";

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

  const getFinalPictureUrl = (preview?: string | null): string => {
    const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_WISHLIST ?? "";
    const DEFAULT_PICTURE_URL =
      "/uploads/wishlistPictures/default-wishlist.png";

    if (!preview) return BACKEND_URL.replace(/\/$/, "") + DEFAULT_PICTURE_URL;

    if (/^(blob:|https?:|data:)/.test(preview)) return preview;

    return (
      BACKEND_URL.replace(/\/$/, "") +
      (preview.startsWith("/") ? "" : "/") +
      preview
    );
  };

  return (
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
      <div className="picture-desc">
        <div className="picture-area">
          <label htmlFor="picture">Image de couverture :</label>

          <div
            style={{
              backgroundImage: `url('${getFinalPictureUrl(picturePreview)}')`,
            }}
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
        </div>
        <div className="desc-area">
          <label htmlFor="description">Description :</label>
          <InputField
            id="description"
            name="description"
            isTextArea
            placeholder="Description"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>
      </div>
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
          label="Collaborateurs"
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

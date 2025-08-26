import { useRef } from "react";
import InputField from "../../../components/forms/InputField";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";
import { CLIENT_ENV } from "../../../config/clientEnv";

interface EditProfilFormProps {
  pseudo: string;
  birthDate: Date;
  picturePreview?: string | null;
  description: string;
  onPseudoChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBirthDateChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onPictureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  buttondisabled: boolean;
}

const EditProfileForm: React.FC<EditProfilFormProps> = ({
  pseudo,
  birthDate,
  picturePreview,
  description,
  onPseudoChange,
  onBirthDateChange,
  onDescriptionChange,
  onPictureChange,
  onSubmit,
  error,
  buttondisabled,
}) => {
  const birthDateString = birthDate.toISOString().substring(0, 10);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const DEFAULT_PICTURE_URL = "/uploads/profilePictures/default-profile.jpg";

  const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_USER;

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="no-modal-form"
    >
      <div className="edit-profile-picture">
        <div
          className="profile-picture"
          style={{
            backgroundImage: `url('${
              picturePreview
                ? picturePreview.startsWith("blob:")
                  ? picturePreview
                  : picturePreview.startsWith("http")
                  ? picturePreview
                  : `${BACKEND_URL}${picturePreview}`
                : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
            }')`,
          }}
          onClick={handlePictureClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onPictureChange}
        />
        <small>Cliquez sur la photo pour la modifier</small>
      </div>

      <label>Pseudo :</label>
      <InputField
        type="text"
        placeholder="Pseudo"
        value={pseudo}
        onChange={onPseudoChange}
        required
      />
      <label>Date de naissance :</label>
      <InputField
        type="date"
        name="birthDate"
        value={birthDateString}
        onChange={onBirthDateChange}
        required
      />
      <label>Description :</label>
      <InputField
        isTextArea
        placeholder="Description"
        value={description}
        onChange={onDescriptionChange}
        className="textarea-style"
      />
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={buttondisabled}>
        Modifier
      </Button>
    </form>
  );
};

export default EditProfileForm;

import { useRef } from "react";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";
import { CLIENT_ENV } from "../../../config/clientEnv";

export interface CreateWishFormProps {
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
  price: string;
  onPriceChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  link: string;
  onLinkChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error: string | null;
  buttondisabled: boolean;
  status: string;
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateWishForm: React.FC<CreateWishFormProps> = ({
  onSubmit,
  title,
  onTitleChange,
  onPictureChange,
  description,
  onDescriptionChange,
  picturePreview,
  price,
  onPriceChange,
  link,
  onLinkChange,
  error,
  buttondisabled,
  status,
  onStatusChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_WISHLIST;

  const DEFAULT_PICTURE_URL = "/uploads/wishPictures/default-wish.png";

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
      <label htmlFor="picture">Image de couverture :</label>
      <img
        src={
          picturePreview?.startsWith("blob:")
            ? picturePreview
            : `${BACKEND_URL}${picturePreview ?? DEFAULT_PICTURE_URL}`
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
      <label htmlFor="price">Prix :</label>
      <InputField
        id="price"
        name="price"
        type="text"
        placeholder="Prix"
        value={price}
        onChange={onPriceChange}
      />
      {/* todo : gérer le prix et vérifier la migration */}
      <label htmlFor="link">URL :</label>
      <InputField
        id="link"
        name="link"
        type="text"
        placeholder="Lien"
        value={link}
        onChange={onLinkChange}
      />
      <label>Disponible ?</label>
      <ToggleSwitch
        name="status"
        checked={status === "available"}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const newValue = target.checked ? "available" : "reserved";

          Object.defineProperty(target, "value", {
            value: newValue,
            writable: true,
          });

          onStatusChange(e as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={buttondisabled}>
        Créer
      </Button>
    </form>
  );
};

export default CreateWishForm;

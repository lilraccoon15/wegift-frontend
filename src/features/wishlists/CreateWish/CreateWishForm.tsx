import { useRef } from "react";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../../config/constants";

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

  const getFinalPictureUrl = (preview?: string | null): string => {
    const baseUrl = BACKEND_URLS.wishlist;
    const defaultUrl = DEFAULT_PICTURES.wish;

    // Si aucune image n'est sélectionnée → image par défaut
    if (!preview) return `${baseUrl}${defaultUrl}`;

    // Si c'est un blob, une URL absolue ou un data URI → on retourne tel quel
    if (/^(blob:|https?:|data:)/.test(preview)) return preview;

    // Sinon on construit l'URL avec le backend
    return `${baseUrl}${preview.startsWith("/") ? preview : `/${preview}`}`;
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
      <label htmlFor="price">Prix :</label>
      <div className="input-price">
        <InputField
          id="price"
          name="price"
          type="number"
          placeholder="Prix"
          value={price}
          onChange={onPriceChange}
          inputMode="decimal"
          step={0.01}
          min={0}
        />
        <i className="fa-solid fa-euro-sign"></i>
      </div>
      <label htmlFor="link">URL :</label>
      <InputField
        id="link"
        name="link"
        type="text"
        placeholder="Lien"
        value={link}
        onChange={onLinkChange}
      />
      <label>Réservable ?</label>
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

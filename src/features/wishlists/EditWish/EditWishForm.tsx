import { useRef } from "react";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";
import InputField from "../../../components/forms/InputField";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";

interface EditWishFormProps {
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
  link: string;
  onLinkChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  price: string;
  onPriceChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error: string | null;
  buttondisabled: boolean;
  status: string;
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditWishForm: React.FC<EditWishFormProps> = ({
  onSubmit,
  title,
  onTitleChange,
  onPictureChange,
  description,
  onDescriptionChange,
  picturePreview,
  link,
  onLinkChange,
  price,
  onPriceChange,
  error,
  buttondisabled,
  status,
  onStatusChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;
  const DEFAULT_PICTURE_URL = "/uploads/wishPictures/default-wish.png";

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
          picturePreview?.startsWith("blob:")
            ? picturePreview
            : picturePreview?.startsWith("http")
            ? picturePreview
            : `${BACKEND_URL}${picturePreview ?? DEFAULT_PICTURE_URL}`
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
      <InputField
        type="text"
        placeholder="Link"
        value={link}
        onChange={onLinkChange}
      />
      <InputField
        type="text"
        placeholder="Price"
        value={price}
        onChange={onPriceChange}
      />
      <ToggleSwitch
        name="status"
        checked={status === "available"}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          Object.defineProperty(target, "value", {
            value: target.checked ? "available" : "reserved",
            writable: true,
          });
          onStatusChange(e as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={buttondisabled}>
        Modifier
      </Button>
    </form>
  );
};

export default EditWishForm;

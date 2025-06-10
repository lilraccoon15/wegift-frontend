import { useRef } from "react";
import InputField from "../../../components/forms/InputField";

interface CreateWishlistFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  wishlistTitle: string;
  onWishlistTitleChange: (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
) => void;
  onWishlistPictureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wishlistDescription: string;
  onWishlistDescriptionChange: (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
) => void;
picturePreview?: string | null;
}

const CreateWishlistForm: React.FC<CreateWishlistFormProps> = ({
  onSubmit,
  wishlistTitle,
  onWishlistTitleChange,
  onWishlistPictureChange,
  wishlistDescription,
  onWishlistDescriptionChange,
  picturePreview
}) => {
        const fileInputRef = useRef<HTMLInputElement | null>(null);

        const handlePictureClick = () => {
            fileInputRef.current?.click();
        };

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

        const DEFAULT_PICTURE_URL = "/default-wishlist.png";
    
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <InputField
        type="text"
        placeholder="Titre"
        value={wishlistTitle}
        onChange={onWishlistTitleChange}
        required
        className=""
      />
      <img
                    src={
                        picturePreview
                            ? picturePreview.startsWith("blob:")
                                ? picturePreview
                                : `${BACKEND_URL}${picturePreview}`
                            : DEFAULT_PICTURE_URL
                    }
                    alt="Photo de profil"
                    className="w-32 h-32 rounded-full object-cover cursor-pointer border-2 border-gray-300"
                    onClick={handlePictureClick}
                />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onWishlistPictureChange}
      />
      <InputField
        type="text"
        placeholder="Description"
        value={wishlistDescription}
        onChange={onWishlistDescriptionChange}
        required
        className=""
      />
    </form>
  );
};

export default CreateWishlistForm;
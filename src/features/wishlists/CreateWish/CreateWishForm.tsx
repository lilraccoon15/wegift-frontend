import { useRef } from "react";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";

interface CreateWishFormProps {
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
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handlePictureClick = () => {
        fileInputRef.current?.click();
    };

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    const DEFAULT_PICTURE_URL = "/default-wish.png";

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <InputField
                type="text"
                placeholder="Titre"
                value={title}
                onChange={onTitleChange}
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
                alt="Photo de couverture"
                className="w-32 h-32 rounded-full object-cover cursor-pointer border-2 border-gray-300"
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
                className=""
            />
            <InputField
                type="text"
                placeholder="Prix"
                value={price}
                onChange={onPriceChange}
                className=""
            />
            <InputField
                type="text"
                placeholder="Lien"
                value={link}
                onChange={onLinkChange}
                className=""
            />
            {error && <Message text={error} type="error" />}
            <Button
                type="submit"
                disabled={buttondisabled}
            >
                Modifier
            </Button>
        </form>
    );
};

export default CreateWishForm;

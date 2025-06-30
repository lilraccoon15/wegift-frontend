import { useRef } from "react";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import RadioGroup from "../../../components/forms/RadioGroup";
import InputField from "../../../components/forms/InputField";

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
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    handleDelete,
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
            <RadioGroup
                name="wishlistAccess"
                selectedValue={access}
                onChange={onAccessChange}
                options={[
                    { label: "Privée", value: "private" },
                    { label: "Publique", value: "public" },
                ]}
            />
            <RadioGroup
                name="wishlistStatus"
                selectedValue={published}
                onChange={onPublishedChange}
                options={[
                    { label: "Publiée", value: "1" },
                    { label: "Archivée", value: "0" },
                ]}
            />
            {error && <Message text={error} type="error" />}
            <Button type="submit" disabled={buttondisabled}>
                Modifier
            </Button>
            <Button type="button" onClick={handleDelete}>
                Supprimer
            </Button>
        </form>
    );
};

export default EditWishlistForm;

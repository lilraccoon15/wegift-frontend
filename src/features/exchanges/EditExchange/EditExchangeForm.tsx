import { useRef } from "react";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import RadioGroup from "../../../components/forms/RadioGroup";
import InputField from "../../../components/forms/InputField";

interface EditExchangeFormProps {
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
    error: string | null;
    buttondisabled: boolean;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const EditExchangeForm: React.FC<EditExchangeFormProps> = ({
    onSubmit,
    title,
    onTitleChange,
    onPictureChange,
    description,
    onDescriptionChange,
    picturePreview,
    error,
    buttondisabled,
    handleDelete,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handlePictureClick = () => {
        fileInputRef.current?.click();
    };

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_EXCHANGE;

    const DEFAULT_PICTURE_URL = "/default-exchange.png";

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

export default EditExchangeForm;

import { useRef } from "react";
import InputField from "../../../components/forms/InputField";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";

interface EditProfilFormProps {
    firstName: string;
    lastName: string;
    birthDate: Date;
    picturePreview?: string | null;
    description: string;
    onFirstNameChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onLastNameChange: (
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
    buttonClassName?: string;
    error: string | null;
    buttondisabled: boolean;
}

const DEFAULT_PICTURE_URL = "/default-profile.png";

const EditProfileForm: React.FC<EditProfilFormProps> = ({
    firstName,
    lastName,
    birthDate,
    picturePreview,
    description,
    onFirstNameChange,
    onLastNameChange,
    onBirthDateChange,
    onDescriptionChange,
    onPictureChange,
    onSubmit,
    buttonClassName = "",
    error,
    buttondisabled,
}) => {
    const birthDateString = birthDate.toISOString().substring(0, 10);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handlePictureClick = () => {
        fileInputRef.current?.click();
    };

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_USER;

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="mb-4 flex flex-col items-center">
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
                    onChange={onPictureChange}
                />
                <small>Cliquez sur la photo pour la changer</small>
            </div>

            <InputField
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={onFirstNameChange}
                required
                className=""
            />
            <InputField
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={onLastNameChange}
                required
                className=""
            />
            <InputField
                type="date"
                name="birthDate"
                value={birthDateString}
                onChange={onBirthDateChange}
                required
            />
            <InputField
                type="text"
                placeholder="Description"
                value={description}
                onChange={onDescriptionChange}
                className=""
            />
            {error && <Message text={error} type="error" />}
            <Button
                type="submit"
                className={buttonClassName}
                disabled={buttondisabled}
            >
                Modifier
            </Button>
        </form>
    );
};

export default EditProfileForm;
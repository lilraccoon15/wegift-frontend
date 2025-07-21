import { useRef } from "react";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import RadioGroup from "../../../components/forms/RadioGroup";
import InputField from "../../../components/forms/InputField";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import FriendTagInput from "../../../components/forms/FriendTagInput";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";

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

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    const DEFAULT_PICTURE_URL =
        "/uploads/wishlistPictures/default-wishlist.png";

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
            />
            <label>Rendre privée ?</label>
            <ToggleSwitch
                name="wishlistAccess"
                checked={access === "private"}
                onChange={(e) =>
                    onAccessChange({
                        ...e,
                        target: {
                            ...e.target,
                            value: e.target.checked ? "private" : "public",
                        },
                    })
                }
            />
            <label>Inviter des amis à collaborer ?</label>
            <ToggleSwitch
                name="wishlistMode"
                checked={mode === "collaborative"}
                onChange={(e) =>
                    onModeChange({
                        ...e,
                        target: {
                            ...e.target,
                            value: e.target.checked
                                ? "collaborative"
                                : "individual",
                        },
                    })
                }
            />
            {mode == "collaborative" && (
                <FriendTagInput
                    participants={participants}
                    setParticipants={setParticipants}
                />
            )}
            <label>Archiver ?</label>
            <ToggleSwitch
                name="wishlistStatus"
                checked={published === "0"}
                onChange={(e) =>
                    onPublishedChange({
                        ...e,
                        target: {
                            ...e.target,
                            value: e.target.checked ? "0" : "1",
                        },
                    })
                }
            />

            {error && <Message text={error} type="error" />}
            <Button type="submit" disabled={buttondisabled}>
                Modifier
            </Button>
        </form>
    );
};

export default EditWishlistForm;

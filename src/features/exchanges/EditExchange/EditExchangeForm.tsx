import { useRef } from "react";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import FriendTagInput from "../../../components/forms/FriendTagInput";

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
    participants: User[];
    setParticipants: React.Dispatch<React.SetStateAction<User[]>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    availableRules: { id: string; title: string; description?: string }[];
    selectedRuleIds: string[];
    setSelectedRuleIds: React.Dispatch<React.SetStateAction<string[]>>;
    budget: string;
    setBudget: React.Dispatch<React.SetStateAction<string>>;
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
    participants,
    setParticipants,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedRuleIds,
    setSelectedRuleIds,
    availableRules,
    budget,
    setBudget,
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
            <label htmlFor="startDate">Date de début</label>
            <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />

            <label htmlFor="endDate">Date de fin</label>
            <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
            <label htmlFor="budget">Budget (en €)</label>
            <input
                type="number"
                step="0.01"
                name="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex : 25.00"
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
            <FriendTagInput
                participants={participants}
                setParticipants={setParticipants}
            />
            <fieldset>
                <legend>Règles à appliquer</legend>

                {availableRules.length === 0 ? (
                    <p>Aucune règle disponible pour le moment.</p>
                ) : (
                    availableRules.map((rule) => (
                        <div key={rule.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedRuleIds.includes(rule.id)}
                                    onChange={() => {
                                        setSelectedRuleIds((prev) =>
                                            prev.includes(rule.id)
                                                ? prev.filter(
                                                      (id) => id !== rule.id
                                                  )
                                                : [...prev, rule.id]
                                        );
                                    }}
                                />
                                {rule.title}
                            </label>
                        </div>
                    ))
                )}
            </fieldset>
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

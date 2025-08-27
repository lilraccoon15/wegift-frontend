import { useRef } from "react";
import Message from "../../../components/ui/Message";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import FriendTagInput from "../../../components/forms/FriendTagInput";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";
import { BACKEND_URLS, DEFAULT_PICTURES } from "../../../config/constants";

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

  const getFinalPictureUrl = (preview?: string | null): string => {
    if (!preview) {
      return `${BACKEND_URLS.exchange}${DEFAULT_PICTURES.exchange}`;
    }

    if (/^(blob:|https?:|data:)/.test(preview)) {
      return preview;
    }

    return `${BACKEND_URLS.exchange}${
      preview.startsWith("/") ? "" : "/"
    }${preview}`;
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
      <label htmlFor="startDate">Date de début :</label>
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <label htmlFor="endDate">Date de fin :</label>
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <label htmlFor="budget">Budget (en €) :</label>
      <input
        type="number"
        step="0.01"
        name="budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Ex : 25.00"
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
      <FriendTagInput
        participants={participants}
        setParticipants={setParticipants}
        label="Participants"
      />
      <fieldset>
        <legend>Règles à appliquer</legend>
        {availableRules.length === 0 ? (
          <p>Aucune règle disponible pour le moment.</p>
        ) : (
          availableRules.map((rule) => (
            <div key={rule.id}>
              <label>{rule.title}</label>
              <ToggleSwitch
                name="exchangeRules"
                checked={selectedRuleIds.includes(rule.id)}
                onChange={() =>
                  setSelectedRuleIds((prev) =>
                    prev.includes(rule.id)
                      ? prev.filter((id) => id !== rule.id)
                      : [...prev, rule.id]
                  )
                }
              />
            </div>
          ))
        )}
      </fieldset>
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={buttondisabled}>
        Modifier
      </Button>
    </form>
  );
};

export default EditExchangeForm;

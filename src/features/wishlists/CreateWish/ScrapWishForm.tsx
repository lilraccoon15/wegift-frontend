import InputField from "../../../components/forms/InputField";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";

export interface ScrapWishFormProps {
  onSubmitScrapping: (e: React.FormEvent<HTMLFormElement>) => void;
  url: string;
  onUrlChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  errorScrapping: string | null;
  buttondisabledScrapping: boolean;
  status: string;
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScrapWishForm = ({
  onSubmitScrapping,
  url,
  onUrlChange,
  errorScrapping,
  buttondisabledScrapping,
  status,
  onStatusChange,
}: ScrapWishFormProps) => {
  return (
    <form onSubmit={onSubmitScrapping} encType="multipart/form-data">
      <label>Url :</label>
      <InputField
        type="text"
        placeholder="URL"
        value={url}
        onChange={onUrlChange}
        required
      />
      <label>Disponible ?</label>
      <ToggleSwitch
        name="status"
        checked={status === "available"}
        onChange={(e) => {
          const newValue = e.target.checked ? "available" : "reserved";
          const fakeEvent = {
            ...e,
            target: {
              ...e.target,
              value: newValue,
            },
          };
          onStatusChange(fakeEvent as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      {errorScrapping && <Message text={errorScrapping} type="error" />}
      <Button type="submit" disabled={buttondisabledScrapping}>
        Créer
      </Button>
    </form>
  );
};

export default ScrapWishForm;

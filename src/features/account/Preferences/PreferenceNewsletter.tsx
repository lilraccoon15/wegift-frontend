import ToggleSwitch from "../../../components/forms/ToggleSwitch";

interface EditNewsletterProps {
  newsletter: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  submitError: string | null;
}

const EditNewsletter: React.FC<EditNewsletterProps> = ({
  newsletter,
  handleCheckboxChange,
  submitError,
}) => {
  return (
    <div>
      <label>Recevoir la newsletter ?</label>
      <ToggleSwitch
        name="newsletter"
        checked={newsletter}
        onChange={handleCheckboxChange}
      />

      {submitError && <p>{submitError}</p>}
    </div>
  );
};

export default EditNewsletter;

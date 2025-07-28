import ToggleSwitch from "../../../components/forms/ToggleSwitch";

interface EditNewsletterProps {
  newsletter: boolean;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  submitError: string | null;
}

const EditNewsletter: React.FC<EditNewsletterProps> = ({
  newsletter,
  handleCheckboxChange,
  submitError,
}) => {
  return (
    <>
      <label>Recevoir la newsletter ?</label>
      <ToggleSwitch
        name="newsletter"
        checked={newsletter}
        onChange={handleCheckboxChange}
      />

      {submitError && <p>{submitError}</p>}
    </>
  );
};

export default EditNewsletter;

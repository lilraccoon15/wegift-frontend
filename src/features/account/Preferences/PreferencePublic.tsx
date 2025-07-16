import ToggleSwitch from "../../../components/forms/ToggleSwitch";

interface EditPublicProps {
  isPublic: boolean;
  handleCheckboxPublicChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitErrorPublic: string | null;
}

const EditPublic: React.FC<EditPublicProps> = ({
  isPublic,
  handleCheckboxPublicChange,
  submitErrorPublic,
}) => {
  return (
    <div>
      <label>Rendre le profil privé ?</label>
      <ToggleSwitch
        name="public"
        checked={!isPublic}
        onChange={(e) => {
          const newValue = !e.target.checked;
          const fakeEvent = {
            ...e,
            target: {
              ...e.target,
              checked: newValue,
            },
          };
          handleCheckboxPublicChange(
            fakeEvent as React.ChangeEvent<HTMLInputElement>
          );
        }}
      />

      {submitErrorPublic && <p>{submitErrorPublic}</p>}
    </div>
  );
};

export default EditPublic;

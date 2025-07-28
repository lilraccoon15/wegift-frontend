import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";

interface TwoFAFormProps {
  code: string;
  error: string | null;
  onCodeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

const TwoFAForm: React.FC<TwoFAFormProps> = ({
  code,
  error,
  onCodeChange,
  onSubmit,
  disabled = false,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        type="text"
        placeholder="Code 2FA"
        value={code}
        onChange={onCodeChange}
        required
      />
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={disabled}>
        Valider code 2FA
      </Button>
    </form>
  );
};

export default TwoFAForm;

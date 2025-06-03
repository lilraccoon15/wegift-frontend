import InputField from "../../forms/InputField";
import Message from "../../ui/Message";

interface TwoFAFormProps {
  code: string;
  error: string | null;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
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
    <div>
      <InputField
        type="text"
        placeholder="Code 2FA"
        value={code}
        onChange={onCodeChange}
        required
        className="mb-2"
      />
      {error && <Message text={error} type="error" />}
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Valider code 2FA
      </button>
    </div>
  );
};

export default TwoFAForm;

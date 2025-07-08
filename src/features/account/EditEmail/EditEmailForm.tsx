import InputField from "../../../components/forms/InputField";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";

interface EditEmailFormProps {
  email: string;
  confirmEmail: string;
  password: string;
  onEmailChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onConfirmEmail: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onPasswordChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttondisabled: boolean;
  error: string | null;
}

const EditEmailForm: React.FC<EditEmailFormProps> = ({
  email,
  confirmEmail,
  password,
  onEmailChange,
  onConfirmEmail,
  onPasswordChange,
  onSubmit,
  buttondisabled,
  error,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        type="email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <InputField
        type="email"
        value={confirmEmail}
        onChange={onConfirmEmail}
        required
      />
      <InputField
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={buttondisabled}>
        Modifier
      </Button>
    </form>
  );
};

export default EditEmailForm;

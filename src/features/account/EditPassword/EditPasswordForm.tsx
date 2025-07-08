import InputField from "../../../components/forms/InputField";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";

interface EditPasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onNewPasswordChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onConfirmPasswordChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttondisabled: boolean;
  error: string | null;
}

const EditPasswordForm: React.FC<EditPasswordProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  buttondisabled,
  error,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        type="password"
        value={currentPassword}
        onChange={onCurrentPasswordChange}
        required
      />
      <InputField
        type="password"
        value={newPassword}
        onChange={onNewPasswordChange}
        required
      />
      <InputField
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        required
      />
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={buttondisabled}>
        Modifier
      </Button>
    </form>
  );
};

export default EditPasswordForm;

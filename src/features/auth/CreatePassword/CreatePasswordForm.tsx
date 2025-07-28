import PasswordFields from "../../../components/ui/PasswordFields";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";

interface CreatePasswordFormProps {
  newPassword: string;
  confirmPassword: string;
  showPassword: boolean;
  passwordValidity: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    digit: boolean;
    specialChar: boolean;
  };
  passwordsMatch: boolean;
  message: string | null;
  error: string | null;
  onNewPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onConfirmPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleShowPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({
  newPassword,
  confirmPassword,
  showPassword,
  passwordValidity,
  passwordsMatch,
  message,
  error,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onToggleShowPassword,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Définir un mot de passe</h2>

      <PasswordFields
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onNewPasswordChange={onNewPasswordChange}
        onConfirmPasswordChange={onConfirmPasswordChange}
        showNewPassword={showPassword}
        onToggleShowNewPassword={onToggleShowPassword}
        passwordValidity={passwordValidity}
        passwordsMatch={passwordsMatch}
      />

      <Button
        type="submit"
        disabled={
          !passwordsMatch || !Object.values(passwordValidity).every(Boolean)
        }
      >
        Enregistrer
      </Button>

      {message && <Message type="success" text={message} />}
      {error && <Message type="error" text={error} />}
    </form>
  );
};

export default CreatePasswordForm;

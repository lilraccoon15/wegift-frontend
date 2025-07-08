import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";

interface LoginFormProps {
  email: string;
  password: string;
  error: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  disabled = false,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>Email :</label>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <label>Mot de passe :</label>
      <InputField
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={onPasswordChange}
        required
      />
      {error && <Message text={error} type="error" />}
      <Button type="submit" disabled={disabled}>
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;

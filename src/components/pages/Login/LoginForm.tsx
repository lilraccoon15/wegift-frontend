import InputField from "../../forms/InputField";
import Message from "../../ui/Message";

interface LoginFormProps {
  email: string;
  password: string;
  error: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
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
    <div>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
        className="mb-2"
      />
      <InputField
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={onPasswordChange}
        required
        className="mb-2"
      />
      {error && <Message text={error} type="error" />}
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Se connecter
      </button>
    </div>
  );
};

export default LoginForm;

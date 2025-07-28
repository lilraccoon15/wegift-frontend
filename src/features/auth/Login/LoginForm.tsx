import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import { useState } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  error: string | null;
  onEmailChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
  const [showPassword, setShowPassword] = useState(false);

  const onToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">
        Email{" "}
        <span className="required-marker" aria-hidden="true">
          *
        </span>{" "}
        : <span className="sr-only">(obligatoire)</span>
      </label>
      <InputField
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <label htmlFor="password">
        Mot de passe{" "}
        <span className="required-marker" aria-hidden="true">
          *
        </span>{" "}
        : <span className="sr-only">(obligatoire)</span>
      </label>
      <div className="input-validation">
        <InputField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button
          type="button"
          className="input-info"
          onClick={onToggleShowPassword}
        >
          <i
            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
          ></i>
        </button>
      </div>
      {error && <Message text={error} type="error" />}
      <Button
        type="submit"
        disabled={disabled || !email.trim() || !password.trim()}
      >
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;

import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import { useState } from "react";

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
    const [showPassword, setShowPassword] = useState(false);

    const onToggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

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
            <div className="input-validation">
                <InputField
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
                        className={`fa-solid ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                    ></i>
                </button>
            </div>
            {error && <Message text={error} type="error" />}
            <Button type="submit" disabled={disabled}>
                Se connecter
            </Button>
        </form>
    );
};

export default LoginForm;

import Button from "../../components/ui/Button";
import InputField from "../../components/forms/InputField";
import Message from "../../components/ui/Message";

interface LoginFormProps {
    email: string;
    password: string;
    error: string | null;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    disabled?: boolean;
    buttonClassName?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
    email,
    password,
    error,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    disabled = false,
    buttonClassName = "",
}) => {
    return (
        <form onSubmit={onSubmit}>
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
            <Button
                type="submit"
                disabled={disabled}
                className={buttonClassName}
            >
                Se connecter
            </Button>
        </form>
    );
};

export default LoginForm;

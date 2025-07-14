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
    emailsMatch: boolean;
    emailValid: boolean;
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
    emailsMatch,
    emailValid,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <label>Nouvelle adresse email :</label>
            <div className="input-validation">
                <InputField
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    required
                />
                <span
                    className={`input-info ${
                        emailValid ? "valid" : "not-valid"
                    }`}
                >
                    {email.length > 0 &&
                        (emailValid ? (
                            <i className="fa-solid fa-circle-check"></i>
                        ) : (
                            <i className="fa-solid fa-circle-exclamation"></i>
                        ))}
                </span>
            </div>
            <label>Confirmer la nouvelle adresse email :</label>
            <div className="input-validation">
                <InputField
                    type="email"
                    value={confirmEmail}
                    onChange={onConfirmEmail}
                    required
                />
                <div
                    className={`input-info ${
                        emailsMatch ? "valid" : "not-valid"
                    }`}
                >
                    {confirmEmail.length > 0 &&
                        (emailsMatch ? (
                            <i className="fa-solid fa-circle-check"></i>
                        ) : (
                            <i className="fa-solid fa-circle-exclamation"></i>
                        ))}
                </div>
            </div>
            <label>Mot de passe :</label>
            <div className="input-validation">
                <InputField
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                    required
                />
            </div>
            {error && <Message text={error} type="error" />}
            <Button type="submit" disabled={buttondisabled}>
                Modifier
            </Button>
        </form>
    );
};

export default EditEmailForm;

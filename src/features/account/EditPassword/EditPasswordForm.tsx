import InputField from "../../../components/forms/InputField";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";
import PasswordFields from "../../../components/ui/PasswordFields";

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
    showCurrentPassword: boolean;
    showNewPassword: boolean;
    onRadioGroupShowPassword: () => void;
    onRadioGroupShowNewPassword: () => void;
    passwordValid: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        digit: boolean;
        specialChar: boolean;
    };
    passwordsMatch: boolean;
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
    showCurrentPassword,
    showNewPassword,
    onRadioGroupShowPassword,
    onRadioGroupShowNewPassword,
    passwordValid,
    passwordsMatch,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <PasswordFields
                currentPassword={currentPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                onCurrentPasswordChange={onCurrentPasswordChange}
                onNewPasswordChange={onNewPasswordChange}
                onConfirmPasswordChange={onConfirmPasswordChange}
                onToggleShowCurrentPassword={onRadioGroupShowPassword}
                onToggleShowNewPassword={onRadioGroupShowNewPassword}
                showCurrentPassword={showCurrentPassword}
                showNewPassword={showNewPassword}
                passwordValidity={passwordValid}
                passwordsMatch={passwordsMatch}
            />
            {error && <Message text={error} type="error" />}
            <Button type="submit" disabled={buttondisabled}>
                Modifier
            </Button>
        </form>
    );
};

export default EditPasswordForm;

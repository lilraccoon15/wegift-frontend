import CreatePasswordForm from "../../features/auth/CreatePassword/CreatePasswordForm";
import { useManageCreatePassword } from "../../features/auth/CreatePassword/useManageCreatePassword";

const CreatePassword = () => {
    const {
        newPassword,
        confirmPassword,
        showPassword,
        passwordValidity,
        passwordsMatch,
        message,
        error,
        setNewPassword,
        setConfirmPassword,
        setShowPassword,
        handleSubmit,
    } = useManageCreatePassword();

    return (
        <CreatePasswordForm
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            showPassword={showPassword}
            passwordValidity={passwordValidity}
            passwordsMatch={passwordsMatch}
            message={message}
            error={error}
            onNewPasswordChange={(e) => setNewPassword(e.target.value)}
            onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
            onToggleShowPassword={() => setShowPassword((prev) => !prev)}
            onSubmit={handleSubmit}
        />
    );
};

export default CreatePassword;

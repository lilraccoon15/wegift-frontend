import { useNavigate } from "react-router-dom";
import EditPasswordForm from "../../features/account/EditPassword/EditPasswordForm";
import { useManageEditPassword } from "../../features/account/EditPassword/useManageEditPassword";
import BackButton from "../../components/ui/BackButton";
import { useMyAccount } from "../../features/account/MyAccountHelpers";
import { useCombinedState } from "../../hooks/useCombineState";
import DataState from "../../components/ui/DataState";

const EditPassword = () => {
    const {
        loading,
        error,
        currentPassword,
        newPassword,
        confirmPassword,
        setCurrentPassword,
        setNewPassword,
        setConfirmPassword,
        handleEditSubmit,
        submitError,
        isSubmitting,
        showCurrentPassword,
        showNewPassword,
        RadioGroupShowCurrentPassword,
        RadioGroupShowNewPassword,
        passwordValid,
        passwordsMatch,
    } = useManageEditPassword();

    const navigate = useNavigate();
    const {
        data: _account,
        error: errorAuth,
        isLoading: loadingAuth,
    } = useMyAccount();

    const { loading: combinedLoading, error: combinedError } = useCombinedState(
        [
            { loading: loadingAuth, error: errorAuth },
            { loading, error },
        ]
    );

    return (
        <DataState loading={combinedLoading} error={combinedError}>
            <div className="title-return">
                <BackButton />
                <h1>Modifier le mot de passe</h1>
            </div>
            {_account?.googleId ? (
                <p className="info-msg">
                    Votre compte utilise la connexion Google. Vous n'avez pas
                    besoin de mot de passe.
                </p>
            ) : (
                <EditPasswordForm
                    currentPassword={currentPassword}
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    onCurrentPasswordChange={(e) =>
                        setCurrentPassword(e.target.value)
                    }
                    onNewPasswordChange={(e) => setNewPassword(e.target.value)}
                    onConfirmPasswordChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    onSubmit={handleEditSubmit}
                    error={submitError}
                    buttondisabled={isSubmitting}
                    passwordValid={passwordValid}
                    passwordsMatch={passwordsMatch}
                    showCurrentPassword={showCurrentPassword}
                    onRadioGroupShowPassword={RadioGroupShowCurrentPassword}
                    showNewPassword={showNewPassword}
                    onRadioGroupShowNewPassword={RadioGroupShowNewPassword}
                />
            )}
        </DataState>
    );
};

export default EditPassword;

import { useNavigate } from "react-router-dom";
import EditEmailForm from "../../features/account/EditEmail/EditEmailForm";
import { useManageEditEmail } from "../../features/account/EditEmail/useManageEditEmail";
import BackButton from "../../components/ui/BackButton";
import { useMyAccount } from "../../features/account/MyAccountHelpers";
import { useCombinedState } from "../../hooks/useCombineState";
import DataState from "../../components/ui/DataState";

const EditEmail = () => {
    const {
        loading,
        error,
        email,
        confirmEmail,
        password,
        setEmail,
        setConfirmEmail,
        setPassword,
        handleEditSubmit,
        submitError,
        isSubmitting,
        emailValid,
        emailsMatch,
    } = useManageEditEmail();
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
                <h1>Modifier l'adresse email</h1>
            </div>
            {_account?.googleId ? (
                <p className="info-msg">
                    Cette adresse email est gérée via Google et ne peut pas être
                    modifiée.
                </p>
            ) : (
                <EditEmailForm
                    email={email}
                    confirmEmail={confirmEmail}
                    password={password}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onConfirmEmail={(e) => setConfirmEmail(e.target.value)}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onSubmit={handleEditSubmit}
                    error={submitError}
                    buttondisabled={isSubmitting}
                    emailValid={emailValid}
                    emailsMatch={emailsMatch}
                />
            )}
        </DataState>
    );
};

export default EditEmail;

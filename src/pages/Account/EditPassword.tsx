import EditPasswordForm from "../../features/account/EditPassword/EditPasswordForm";
import { useManageEditPassword } from "../../features/account/EditPassword/useManageEditPassword";

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
    } = useManageEditPassword();

    if (loading) return null;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h1>modifier le mot de passe</h1>
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
            />
        </>
    );
};

export default EditPassword;

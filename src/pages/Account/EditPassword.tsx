import { useState } from "react";
import { useMyAccount } from "../../features/account/MyAccountHelpers";
import EditPasswordForm from "../../features/account/EditPassword/EditPasswordForm";
import { updatePassword } from "../../features/account/EditPassword/EditPasswordHelpers";

const EditPassword = () => {
    const { data: account, error, isLoading: loading } = useMyAccount();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitError(null);

        if(newPassword !== confirmPassword) {
            setSubmitError("Les mots de passe ne correspondent pas.");
            setIsSubmitting(false);
            return;
        }

        if(!currentPassword) {
            setSubmitError("Veuillez saisir votre mot de passe.");
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);

        try {
            await updatePassword({currentPassword, newPassword});
            alert("Mot de passe modifié avec succès");
        } catch (err: any) {
            setSubmitError(err.message || "Erreur lors de la modification");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h1>modifier le mot de passe</h1>
            <EditPasswordForm
                currentPassword={currentPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                onCurrentPasswordChange={(e) => setCurrentPassword(e.target.value)}
                onNewPasswordChange={(e) => setNewPassword(e.target.value)}
                onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                onSubmit={handleEditSubmit}
                error={submitError}
                buttondisabled={isSubmitting}
            />
        </>
    );
};

export default EditPassword;
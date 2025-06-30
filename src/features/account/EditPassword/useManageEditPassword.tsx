import { useState } from "react";
import { updatePassword } from "./EditPasswordHelpers";
import { useMyAccount } from "../MyAccountHelpers";

export const useManageEditPassword = () => {
    const { data: _account, error, isLoading: loading } = useMyAccount();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitError(null);

        if (newPassword !== confirmPassword) {
            setSubmitError("Les mots de passe ne correspondent pas.");
            setIsSubmitting(false);
            return;
        }

        if (!currentPassword) {
            setSubmitError("Veuillez saisir votre mot de passe.");
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);

        try {
            await updatePassword({ currentPassword, newPassword });
            alert("Mot de passe modifié avec succès");
        } catch (err: any) {
            setSubmitError(err.message || "Erreur lors de la modification");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
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
    };
};

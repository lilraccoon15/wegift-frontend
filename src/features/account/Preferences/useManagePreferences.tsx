import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useMyAccount } from "../MyAccountHelpers";
import { deleteAccount } from "../DeleteAccount/DeleteAccountHelpers";
import { updateNewsletter } from "./PreferencesHelpers";

export const useManagePreferences = (navigate: any) => {
    const { data: account, error, isLoading: loading } = useMyAccount();

    const [newsletter, setNewsletter] = useState<boolean>(
        account?.newsletter ?? false
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitErrorDelete, setSubmitErrorDelete] = useState<string | null>(
        null
    );
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [password, setPassword] = useState("");
    const { logout } = useAuth();

    const buttonClassName = "";

    const handleCheckboxChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue = e.target.checked;
        setNewsletter(newValue);
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await updateNewsletter({ newsletter: newValue });
            alert("Préférence de newsletter modifiée avec succès !");
        } catch (err: any) {
            setSubmitError(err.message || "Erreur lors de la modification");
            setNewsletter(!newValue);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShowConfirmation = () => setShowConfirmation(true);
    const handleHideConfirmation = () => setShowConfirmation(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingDelete(true);
        setSubmitErrorDelete(null);

        try {
            await deleteAccount({ password });
            await logout();
            navigate("/");
        } catch (err: any) {
            setSubmitErrorDelete(
                err.message || "Erreur lors de la suppression du compte"
            );
        } finally {
            setIsSubmittingDelete(false);
        }
    };

    return {
        loading,
        error,
        newsletter,
        handleCheckboxChange,
        isSubmitting,
        submitError,
        showConfirmation,
        handleShowConfirmation,
        handleHideConfirmation,
        password,
        handlePasswordChange,
        submitErrorDelete,
        isSubmittingDelete,
        handleDeleteAccount,
    };
};

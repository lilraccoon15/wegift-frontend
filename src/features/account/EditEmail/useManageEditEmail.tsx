import { useEffect, useState } from "react";
import { useMyAccount } from "../MyAccountHelpers";
import { updateEmail } from "./EditEmailHelpers";

export const useManageEditEmail = () => {
    const { data: account, error, isLoading: loading } = useMyAccount();

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        if (account) {
            setEmail(account.email || "");
        }
    }, [account]);

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitError(null);

        if (email !== confirmEmail) {
            setSubmitError("Les adresses email ne correspondent pas.");
            setIsSubmitting(false);
            return;
        }

        if (!password) {
            setSubmitError("Veuillez saisir votre mot de passe.");
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);

        try {
            await updateEmail({ email, password });
            alert("Email modifié avec succès !");
        } catch (err: any) {
            setSubmitError(err.message || "Erreur lors de la modification");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
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
    };
};

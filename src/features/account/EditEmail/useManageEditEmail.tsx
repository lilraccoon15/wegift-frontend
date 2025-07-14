import { useEffect, useState } from "react";
import { useMyAccount } from "../MyAccountHelpers";
import { updateEmail } from "./EditEmailHelpers";
import { checkEmailAvailability } from "../../auth/Register/RegisterHelpers";

export const useManageEditEmail = () => {
    const { data: account, error, isLoading: loading } = useMyAccount();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [emailsMatch, setEmailsMatch] = useState(true);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        if (account) {
            setEmail(account.email || "");
        }
    }, [account]);

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!validateEmail(email)) {
                setEmailValid(false);
                return;
            }

            const isAvailable = await checkEmailAvailability(email);
            setEmailValid(isAvailable);
        }, 400);

        return () => clearTimeout(delay);
    }, [email]);

    useEffect(() => {
        setEmailsMatch(email === confirmEmail);
    }, [email, confirmEmail]);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

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
        emailValid,
        emailsMatch,
    };
};

import { useEffect, useState } from "react";
import { useMyAccount } from "../../features/account/MyAccountHelpers";
import EditEmailForm from "../../features/account/EditEmail/EditEmailForm";
import { updateEmail } from "../../features/account/EditEmail/EditEmailHelpers";

const EditEmail = () => {
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
            return;
        }

        if (!password) {
            setSubmitError("Veuillez saisir votre mot de passe.");
            return;
        }

        setIsSubmitting(true);

        try {
            await updateEmail({email, password});
            alert("Email modifié avec succès !");
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
            <p>modifier l'email</p>
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
            />
        </>
    );
};

export default EditEmail;
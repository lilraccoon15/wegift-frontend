import { useEffect, useState } from "react";
import { useMyAccount } from "../../features/account/MyAccountHelpers";
import { updateNewsletter } from "../../features/account/Preferences/PreferencesHelpers";
import EditNewsletter from "../../features/account/Preferences/PreferenceNewsletter";

const Preferences = () => {
    const { data: account, error, isLoading: loading } = useMyAccount();

    const [newsletter, setNewsletter] = useState<boolean>(
        account?.newsletter ?? false
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <EditNewsletter
            newsletter={newsletter}
            handleCheckboxChange={handleCheckboxChange}
            isSubmitting={isSubmitting}
            submitError={submitError}
        />
    );
};

export default Preferences;

import EditEmailForm from "../../features/account/EditEmail/EditEmailForm";
import { useManageEditEmail } from "../../features/account/EditEmail/useManageEditEmail";

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
    } = useManageEditEmail();

    if (loading) return null;
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

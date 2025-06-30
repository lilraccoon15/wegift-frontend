import Button from "../../../components/ui/Button";

interface DeleteAccountProps {
    showConfirmation: boolean;
    setShowConfirmation: () => void;
    setHideConfirmation: () => void;
    password: string;
    setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitError: string | null;
    buttondisabled: boolean;
    handleDeleteAccount: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
    showConfirmation,
    setShowConfirmation,
    setHideConfirmation,
    password,
    setPassword,
    submitError,
    buttondisabled,
    handleDeleteAccount,
}) => {
    return (
        <div>
            {!showConfirmation ? (
                <Button onClick={setShowConfirmation} disabled={buttondisabled}>
                    Supprimer mon compte
                </Button>
            ) : (
                <form onSubmit={handleDeleteAccount}>
                    <p>Veuillez entrer votre mot de passe pour confirmer :</p>
                    <input
                        type="password"
                        value={password}
                        onChange={setPassword}
                        required
                    />
                    <Button type="submit" disabled={buttondisabled}>
                        Confirmer la suppression
                    </Button>
                    <Button type="button" onClick={setHideConfirmation}>
                        Annuler
                    </Button>
                </form>
            )}
            {submitError && <p style={{ color: "red" }}>{submitError}</p>}
        </div>
    );
};

export default DeleteAccount;

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
        <>
            {!showConfirmation ? (
                <Button onClick={setShowConfirmation} disabled={buttondisabled}>
                    Supprimer mon compte
                </Button>
            ) : (
                <form onSubmit={handleDeleteAccount}>
                    <label>
                        Veuillez entrer votre mot de passe pour confirmer :
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={setPassword}
                        required
                    />
                    <div className="btn-delete-account">
                        <button
                            type="button"
                            onClick={setHideConfirmation}
                            className="btn cancel-delete"
                        >
                            Annuler
                        </button>
                        <Button type="submit" disabled={buttondisabled}>
                            Confirmer
                        </Button>
                    </div>
                </form>
            )}
            {submitError && <p>{submitError}</p>}
        </>
    );
};

export default DeleteAccount;

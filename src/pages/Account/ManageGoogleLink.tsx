import { useMyAccount } from "../../features/account/MyAccountHelpers";
import Button from "../../components/ui/Button";
import DataState from "../../components/ui/DataState";

const ManageGoogleLink = () => {
    const { data: account, isLoading, error } = useMyAccount();

    const handleLinkGoogle = () => {
        window.location.href = `${
            import.meta.env.VITE_API_URL
        }/api/auth/oauth/google?link=true`;
    };

    const handleUnlinkGoogle = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/unlink-google`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                const data = await res.json();
                if (data.message.includes("définir un mot de passe")) {
                    window.location.href = "/set-password";
                    return;
                }
                throw new Error(data.message);
            }

            window.location.reload();
        } catch (err) {
            console.error("Erreur lors de la dissociation de Google", err);
        }
    };

    return (
        <DataState loading={isLoading} error={error}>
            {account && (
                <div className="google-link-page">
                    <h2>Connexion avec Google</h2>
                    {account.googleId ? (
                        <>
                            <p>
                                ✅ Votre compte est actuellement lié à Google.
                            </p>
                            <p>
                                Email Google : <strong>{account.email}</strong>
                            </p>
                            <Button onClick={handleUnlinkGoogle}>
                                Dissocier Google
                            </Button>
                        </>
                    ) : (
                        <>
                            <p>Votre compte n’est pas encore lié à Google.</p>
                            <Button onClick={handleLinkGoogle}>
                                Lier mon compte à Google
                            </Button>
                        </>
                    )}
                </div>
            )}
        </DataState>
    );
};

export default ManageGoogleLink;

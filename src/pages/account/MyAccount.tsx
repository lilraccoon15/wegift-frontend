import Button from "../../components/ui/Button";
import { useMyAccount } from "../../features/account/MyAccountHelpers";
import { useState } from "react";
import Enable2FA from "./Enable2FA";
import EditEmail from "./EditEmail";

const MyAccount = () => {
    const { data: _account, error, isLoading: loading } = useMyAccount();

    const [currentView, setCurrentView] = useState<
        "default" | "editEmail" | "editPassword" | "enable2fa" | "preferences"
    >("default");

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h2>mon compte</h2>
            {currentView === "default" && (
                <>
                    <Button onClick={() => setCurrentView("editEmail")}>
                        Modifier mon adresse email
                    </Button>
                    <Button onClick={() => setCurrentView("editPassword")}>
                        Modifier mon mot de passe
                    </Button>
                    <Button onClick={() => setCurrentView("enable2fa")}>
                        Double authentification
                    </Button>
                    <Button onClick={() => setCurrentView("preferences")}>
                        Préférences
                    </Button>
                </>
            )}

            {currentView === "editEmail" && (
                <>
                    <EditEmail />
                    <Button onClick={() => setCurrentView("default")}>
                        Retour
                    </Button>
                </>
            )}

            {currentView === "editPassword" && (
                <>
                    <p>Formulaire pour modifier le mot de passe ici</p>
                    <Button onClick={() => setCurrentView("default")}>
                        Retour
                    </Button>
                </>
            )}

            {currentView === "enable2fa" && (
                <>
                    <p>Formulaire pour le 2fa</p>
                    <Enable2FA />
                    <Button onClick={() => setCurrentView("default")}>
                        Retour
                    </Button>
                </>
            )}

            {currentView === "preferences" && (
                <>
                    <p>Affichage des préférences ici</p>
                    <Button onClick={() => setCurrentView("default")}>
                        Retour
                    </Button>
                </>
            )}
        </>
    );
};

export default MyAccount;

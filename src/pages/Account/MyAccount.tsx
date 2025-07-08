import { useMyAccount } from "../../features/account/MyAccountHelpers";
import { useState } from "react";
import Enable2FA from "./Enable2FA";
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";
import Preferences from "./Preferences";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { data: _account, error, isLoading: loading } = useMyAccount();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState<
    "default" | "editEmail" | "editPassword" | "enable2fa" | "preferences"
  >("default");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return null;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <h2>mon compte</h2>
      {currentView === "default" && (
        <>
          <p onClick={() => setCurrentView("editEmail")}>
            Modifier mon adresse email
          </p>
          <p onClick={() => setCurrentView("editPassword")}>
            Modifier mon mot de passe
          </p>
          <p onClick={() => setCurrentView("enable2fa")}>
            Double authentification
          </p>
          <p onClick={() => setCurrentView("preferences")}>Préférences</p>
          <p onClick={handleLogout}>Déconnexion</p>
        </>
      )}

      {currentView === "editEmail" && (
        <>
          <EditEmail />
          <p onClick={() => setCurrentView("default")}>Retour</p>
        </>
      )}

      {currentView === "editPassword" && (
        <>
          <EditPassword />
          <p onClick={() => setCurrentView("default")}>Retour</p>
        </>
      )}

      {currentView === "enable2fa" && (
        <>
          <p>Formulaire pour le 2fa</p>
          <Enable2FA />
          <p onClick={() => setCurrentView("default")}>Retour</p>
        </>
      )}

      {currentView === "preferences" && (
        <>
          <p>Affichage des préférences ici</p>
          <Preferences />
          <p onClick={() => setCurrentView("default")}>Retour</p>
        </>
      )}
    </>
  );
};

export default MyAccount;

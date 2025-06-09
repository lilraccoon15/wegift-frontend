import { useEffect, useState } from "react";
import { useMyAccount } from "../../features/account/MyAccountHelpers";
import { updateNewsletter } from "../../features/account/Preferences/PreferencesHelpers";
import EditNewsletter from "../../features/account/Preferences/PreferenceNewsletter";
import DeleteAccount from "../../features/account/DeleteAccount/DeleteAccount";
import { deleteAccount } from "../../features/account/DeleteAccount/DeleteAccountHelpers";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const { data: account, error, isLoading: loading } = useMyAccount();

  const [newsletter, setNewsletter] = useState<boolean>(
    account?.newsletter ?? false
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitErrorDelete, setSubmitErrorDelete] = useState<string | null>(
    null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const buttonClassName = "";

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

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleHideConfirmation = () => setShowConfirmation(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingDelete(true);
    setSubmitErrorDelete(null);

    try {
      await deleteAccount({ password });
      await logout();
      navigate("/");
    } catch (err: any) {
      setSubmitErrorDelete(
        err.message || "Erreur lors de la suppression du compte"
      );
    } finally {
      setIsSubmittingDelete(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <EditNewsletter
        newsletter={newsletter}
        handleCheckboxChange={handleCheckboxChange}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />

      <DeleteAccount
        showConfirmation={showConfirmation}
        setShowConfirmation={handleShowConfirmation}
        setHideConfirmation={handleHideConfirmation}
        password={password}
        setPassword={handlePasswordChange}
        submitError={submitErrorDelete}
        buttondisabled={isSubmittingDelete}
        handleDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
};

export default Preferences;

import EditNewsletter from "../../features/account/Preferences/PreferenceNewsletter";
import DeleteAccount from "../../features/account/DeleteAccount/DeleteAccount";
import { useNavigate } from "react-router-dom";
import { useManagePreferences } from "../../features/account/Preferences/useManagePreferences";

const Preferences = () => {
  
  const navigate = useNavigate();

  const {
    loading,
    error,
    newsletter,
    handleCheckboxChange,
    isSubmitting,
    submitError,
    showConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
    password,
    handlePasswordChange,
    submitErrorDelete,
    isSubmittingDelete,
    handleDeleteAccount
  } = useManagePreferences(navigate);

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

import EditNewsletter from "../../features/account/Preferences/PreferenceNewsletter";
import DeleteAccount from "../../features/account/DeleteAccount/DeleteAccount";
import { useNavigate } from "react-router-dom";
import { useManagePreferences } from "../../features/account/Preferences/useManagePreferences";
import BackButton from "../../components/ui/BackButton";
import DataState from "../../components/ui/DataState";
import EditPublic from "../../features/account/Preferences/PreferencePublic";

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
    handleDeleteAccount,
    isPublic,
    handleCheckboxPublicChange,
    isSubmittingPublic,
    submitErrorPublic,
  } = useManagePreferences(navigate);

  return (
    <DataState loading={loading} error={error}>
      <div className="title-return">
        <BackButton />
        <h1>Préférences</h1>
      </div>
      <EditNewsletter
        newsletter={newsletter}
        handleCheckboxChange={handleCheckboxChange}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />

      <EditPublic
        isPublic={isPublic}
        handleCheckboxPublicChange={handleCheckboxPublicChange}
        isSubmittingPublic={isSubmittingPublic}
        submitErrorPublic={submitErrorPublic}
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
    </DataState>
  );
};

export default Preferences;

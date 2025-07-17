import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useMyAccount } from "../MyAccountHelpers";
import { deleteAccount } from "../DeleteAccount/DeleteAccountHelpers";
import { updateIsPublic, updateNewsletter } from "./PreferencesHelpers";
import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";

export const useManagePreferences = (navigate: any) => {
  const { data: account, error, isLoading: loading } = useMyAccount();
  const { data: user } = useMyProfile();

  const [newsletter, setNewsletter] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitErrorPublic, setSubmitErrorPublic] = useState<string | null>(
    null
  );
  const [submitErrorDelete, setSubmitErrorDelete] = useState<string | null>(
    null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    if (account) {
      setNewsletter(account.newsletter ?? false);
    }
  }, [account]);

  useEffect(() => {
    if (user) {
      setIsPublic(user.isPublic ?? true);
    }
  }, [user]);

  const handleCheckboxPublicChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.checked;
    setIsPublic(newValue);
    setSubmitErrorPublic(null);

    try {
      await updateIsPublic({ isPublic: newValue });
      alert("Préférence de visibilité du profil modifiée avec succès !");
    } catch (err: any) {
      setSubmitErrorPublic(err.message || "Erreur lors de la modification");
      setIsPublic(!newValue);
    }
  };

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.checked;
    setNewsletter(newValue);
    setSubmitError(null);

    try {
      await updateNewsletter({ newsletter: newValue });
      alert("Préférence de newsletter modifiée avec succès !");
    } catch (err: any) {
      setSubmitError(err.message || "Erreur lors de la modification");
      setNewsletter(!newValue);
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

  return {
    loading,
    error,
    newsletter,
    handleCheckboxChange,
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
    submitErrorPublic,
    handleCheckboxPublicChange,
  };
};

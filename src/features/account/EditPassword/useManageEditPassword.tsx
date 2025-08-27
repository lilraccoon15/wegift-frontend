import { useEffect, useState } from "react";
import { updatePassword } from "./EditPasswordHelpers";
import { useMyAccount } from "../MyAccountHelpers";

export const useManageEditPassword = () => {
  const { data: _account, error, isLoading: loading } = useMyAccount();

  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    validatePassword(newPassword);
  }, [newPassword]);

  const validatePassword = (password: string) => {
    setPasswordValid({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    });
  };

  const RadioGroupShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const RadioGroupShowCurrentPassword = () => {
    setShowCurrentPassword((show) => !show);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);

    if (newPassword !== confirmPassword) {
      setSubmitError("Les mots de passe ne correspondent pas.");
      setIsSubmitting(false);
      return;
    }

    if (!currentPassword) {
      setSubmitError("Veuillez saisir votre mot de passe.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePassword({ currentPassword, newPassword });
      alert("Mot de passe modifié avec succès");
    } catch (err: any) {
      setSubmitError(err.message || "Erreur lors de la modification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    loading,
    error,
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleEditSubmit,
    submitError,
    isSubmitting,
    passwordsMatch,
    showCurrentPassword,
    showNewPassword,
    RadioGroupShowCurrentPassword,
    RadioGroupShowNewPassword,
    passwordValid,
  };
};

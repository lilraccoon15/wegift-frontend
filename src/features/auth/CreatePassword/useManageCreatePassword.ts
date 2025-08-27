import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPassword } from "./CreatePasswordHelpers";

export const useManageCreatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const length = newPassword.length >= 8;
    const uppercase = /[A-Z]/.test(newPassword);
    const lowercase = /[a-z]/.test(newPassword);
    const digit = /\d/.test(newPassword);
    const specialChar = /[^A-Za-z0-9]/.test(newPassword);

    setPasswordValidity({
      length,
      uppercase,
      lowercase,
      digit,
      specialChar,
    });
  }, [newPassword]);

  const passwordsMatch = newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await createPassword(newPassword);
      if (res.ok) {
        setMessage("Mot de passe enregistré ✅");
        setTimeout(() => navigate("/account"), 2000);
      } else {
        setError("Une erreur est survenue.");
      }
    } catch {
      setError("Erreur lors de l’enregistrement.");
    }
  };

  return {
    newPassword,
    confirmPassword,
    showPassword,
    message,
    error,
    passwordValidity,
    passwordsMatch,
    setNewPassword,
    setConfirmPassword,
    setShowPassword,
    handleSubmit,
  };
};

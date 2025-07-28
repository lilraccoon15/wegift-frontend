import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";
import { resetPassword } from "./ResetPasswordHelpers";
import PasswordFields from "../../../components/ui/PasswordFields";

type ChangePasswordFormProps = {
  token: string;
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  useEffect(() => {
    const length = newPassword.length >= 8;
    const uppercase = /[A-Z]/.test(newPassword);
    const lowercase = /[a-z]/.test(newPassword);
    const digit = /\d/.test(newPassword);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    setPasswordValidity({
      length,
      uppercase,
      lowercase,
      digit,
      specialChar,
    });
  }, [newPassword]);

  const passwordsMatch = newPassword === confirmPassword;
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await resetPassword(token, newPassword);
      if (res.ok) {
        setMessage("Mot de passe mis à jour !");
      } else {
        setError("Erreur : le lien est peut-être expiré.");
      }
    } catch {
      setError("Erreur lors de la réinitialisation.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PasswordFields
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onNewPasswordChange={(e) => setNewPassword(e.target.value)}
        onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
        showNewPassword={showPassword}
        onToggleShowNewPassword={() => setShowPassword((prev) => !prev)}
        passwordValidity={passwordValidity}
        passwordsMatch={passwordsMatch}
      />
      <Button
        type="submit"
        disabled={
          !passwordsMatch || !Object.values(passwordValidity).every(Boolean)
        }
      >
        Réinitialiser
      </Button>

      {message && <Message type="success" text={message} />}
      {error && <Message type="error" text={error} />}
    </form>
  );
};

export default ChangePasswordForm;

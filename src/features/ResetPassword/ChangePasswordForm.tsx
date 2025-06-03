import React, { useState } from "react";
import Button from "../../components/ui/Button";
import InputField from "../../components/forms/InputField";
import Message from "../../components/ui/Message";
import { resetPassword } from "./ResetPasswordHelpers";

type ChangePasswordFormProps = {
  token: string;
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ token }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await resetPassword(token, password);
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <label className="block mb-2">
        Nouveau mot de passe :
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
      </label>
      <Button type="submit" className="mt-4">
        Réinitialiser
      </Button>

      {message && <Message type="success" text={message} />}
      {error && <Message type="error" text={error} />}
    </form>
  );
};

export default ChangePasswordForm;

import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import { requestResetPassword } from "./ResetPasswordHelpers";

const RequestResetForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await requestResetPassword(email);
      if (res.ok) {
        setMessage("Lien envoyé ! Merci de vérifier vos emails.");
      } else {
        setError("Erreur lors de l'envoi.");
      }
    } catch {
      setError("Erreur lors de l'envoi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <label className="block mb-2">
        Adresse e-mail :
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </label>
      <Button type="submit" className="mt-4">
        Envoyer le lien
      </Button>

      {message && <Message type="success" text={message} />}
      {error && <Message type="error" text={error} />}
    </form>
  );
};

export default RequestResetForm;

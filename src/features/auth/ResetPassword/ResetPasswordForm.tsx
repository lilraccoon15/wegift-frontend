import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/forms/InputField";
import Message from "../../../components/ui/Message";
import { requestResetPassword } from "./ResetPasswordHelpers";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/ui/ConfirmModal";

const RequestResetForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await requestResetPassword(email);
      if (res.ok) {
        setShowSuccessModal(true);
      } else {
        setError("Erreur lors de l'envoi.");
      }
    } catch {
      setError("Erreur lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Adresse e-mail{" "}
          <span className="required-marker" aria-hidden="true">
            *
          </span>{" "}
          : <span className="sr-only">(obligatoire)</span>
        </label>
        <InputField
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
        </Button>

        {message && <Message type="success" text={message} />}
        {error && <Message type="error" text={error} />}
      </form>

      {showSuccessModal && (
        <ConfirmModal
          title="Demande envoyée"
          message={`Si un compte est associé à l'adresse renseignée, vous recevrez un lien de réinitialisation par mail.`}
          confirmLabel="Accueil"
          onConfirm={() => navigate("/")}
          onClose={() => navigate("/")}
        />
      )}
    </>
  );
};

export default RequestResetForm;

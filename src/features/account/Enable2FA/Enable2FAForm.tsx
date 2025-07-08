// Enable2FAForm.tsx
import React from "react";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";
import InputField from "../../../components/forms/InputField";

type Props = {
  qrCodeUrl: string | null;
  code: string;
  is2FAEnabled: boolean;
  error: string | null;
  message: string | null;
  onCodeChange: (val: string) => void;
  onEnable: () => void;
  onDisable: () => void;
};

const Enable2FAForm: React.FC<Props> = ({
  qrCodeUrl,
  code,
  is2FAEnabled,
  error,
  message,
  onCodeChange,
  onEnable,
  onDisable,
}) => {
  return (
    <div>
      <h1>Gestion de la double authentification (2FA)</h1>

      {error && <Message type="error" text={error} />}
      {message && <Message type="success" text={message} />}

      {is2FAEnabled ? (
        <>
          <p>La 2FA est activée sur votre compte.</p>
          <Button onClick={onDisable}>Désactiver la 2FA</Button>
        </>
      ) : (
        <>
          {qrCodeUrl ? (
            <>
              <img src={qrCodeUrl} alt="QR Code 2FA" />
              <p>
                Scannez ce QR code avec votre application d'authentification
                (Google Authenticator, Authy, etc.)
              </p>

              <InputField
                type="text"
                placeholder="Saisissez le code généré"
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
              />

              <Button onClick={onEnable}>Activer 2FA</Button>
            </>
          ) : (
            <p>Chargement du QR code...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Enable2FAForm;

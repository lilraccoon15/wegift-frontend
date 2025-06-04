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
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Gestion de la double authentification (2FA)</h1>

      {error && <Message type="error" text={error} />}
      {message && <Message type="success" text={message} />}

      {is2FAEnabled ? (
        <>
          <p className="mb-4">La 2FA est activée sur votre compte.</p>
          <Button onClick={onDisable} className="bg-red-600 text-white px-4 py-2 rounded">
            Désactiver la 2FA
          </Button>
        </>
      ) : (
        <>
          {qrCodeUrl ? (
            <>
              <img src={qrCodeUrl} alt="QR Code 2FA" className="mb-4" />
              <p>Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)</p>

              <InputField
                type="text"
                placeholder="Saisissez le code généré"
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                className="border p-2 mt-4 mb-4 w-full"
              />

              <Button onClick={onEnable} className="bg-blue-600 text-white px-4 py-2 rounded">
                Activer 2FA
              </Button>
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

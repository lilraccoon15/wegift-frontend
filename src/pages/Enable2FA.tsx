import { useEffect, useState } from "react";
import Enable2FAForm from "../features/Enable2FA/Enable2FAForm";
import { fetch2FAStatus, generate2FA, enable2FA, disable2FA } from "../features/Enable2FA/Enable2FAHelpers";

const Enable2FA = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [_secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      try {
        const statusData = await fetch2FAStatus();
        if (statusData.success) {
          if (statusData.data.is2FAEnabled) {
            setIs2FAEnabled(true);
            setMessage("2FA déjà activée");
            setQrCodeUrl(null);
            setSecret(null);
          } else {
            setIs2FAEnabled(false);
            const genData = await generate2FA();
            if (genData.success) {
              setQrCodeUrl(genData.data.qrCodeDataURL);
              setSecret(genData.data.secret);
              setMessage(null);
              setError(null);
            } else {
              setError("Erreur lors de la génération 2FA");
            }
          }
        } else {
          setError("Impossible de récupérer le statut 2FA");
        }
      } catch {
        setError("Impossible de récupérer le statut 2FA");
      }
    }

    init();
  }, []);

  const handleEnable = async () => {
    setError(null);
    setMessage(null);

    if (!code) {
      setError("Veuillez saisir le code 2FA");
      return;
    }

    try {
      const result = await enable2FA(code);
      if (result.success) {
        setMessage("2FA activée avec succès !");
        setIs2FAEnabled(true);
        setQrCodeUrl(null);
        setSecret(null);
      } else {
        setError(result.message || "Code invalide");
      }
    } catch {
      setError("Erreur lors de l'activation 2FA");
    }
  };

  const handleDisable = async () => {
    setError(null);
    setMessage(null);

    try {
      const result = await disable2FA();
      if (result.success) {
        setMessage("2FA désactivée avec succès");
        setIs2FAEnabled(false);
        const genData = await generate2FA();
        if (genData.success) {
          setQrCodeUrl(genData.data.qrCodeDataURL);
          setSecret(genData.data.secret);
        }
      } else {
        setError(result.message || "Erreur lors de la désactivation 2FA");
      }
    } catch {
      setError("Erreur lors de la désactivation 2FA");
    }
  };

  return (
    <Enable2FAForm
      qrCodeUrl={qrCodeUrl}
      code={code}
      is2FAEnabled={is2FAEnabled}
      error={error}
      message={message}
      onCodeChange={setCode}
      onEnable={handleEnable}
      onDisable={handleDisable}
    />
  );
};

export default Enable2FA;

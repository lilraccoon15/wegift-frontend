import { useEffect, useState } from "react";

const Enable2FA = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [_secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/auth/2fa-status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.data.is2FAEnabled) {
            setIs2FAEnabled(true);
            setMessage("2FA déjà activée");
            setQrCodeUrl(null);
            setSecret(null);
          } else {
            setIs2FAEnabled(false);
            fetch("http://localhost:4000/api/auth/generate-2fa", {
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  setQrCodeUrl(data.data.qrCodeDataURL);
                  setSecret(data.data.secret);
                  setMessage(null);
                  setError(null);
                } else {
                  setError("Erreur lors de la génération 2FA");
                }
              })
              .catch(() => setError("Erreur lors de la génération 2FA"));
          }
        } else {
          setError("Impossible de récupérer le statut 2FA");
        }
      })
      .catch(() => setError("Impossible de récupérer le statut 2FA"));
  }, []);

  const handleEnable = async () => {
    setError(null);
    setMessage(null);

    if (!code) {
      setError("Veuillez saisir le code 2FA");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/enable-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok && result.success) {
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
      const res = await fetch("http://localhost:4000/api/auth/disable-2fa", {
        method: "POST",
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setMessage("2FA désactivée avec succès");
        setIs2FAEnabled(false);
        fetch("http://localhost:4000/api/auth/generate-2fa", {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setQrCodeUrl(data.data.qrCodeDataURL);
              setSecret(data.data.secret);
            }
          });
      } else {
        setError(result.message || "Erreur lors de la désactivation 2FA");
      }
    } catch {
      setError("Erreur lors de la désactivation 2FA");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Gestion de la double authentification (2FA)</h1>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      {is2FAEnabled ? (
        <>
          <p className="mb-4">La 2FA est activée sur votre compte.</p>
          <button
            onClick={handleDisable}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Désactiver la 2FA
          </button>
        </>
      ) : (
        <>
          {qrCodeUrl ? (
            <>
              <img src={qrCodeUrl} alt="QR Code 2FA" className="mb-4" />
              <p>Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)</p>

              <input
                type="text"
                placeholder="Saisissez le code généré"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 mt-4 mb-4 w-full"
              />

              <button
                onClick={handleEnable}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Activer 2FA
              </button>
            </>
          ) : (
            <p>Chargement du QR code...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Enable2FA;

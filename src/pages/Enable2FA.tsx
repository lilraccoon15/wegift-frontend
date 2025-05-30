import { useEffect, useState } from "react";

const Enable2FA = () => {
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      const res = await fetch("http://localhost:4000/api/auth/generate-2fa", {
        credentials: "include",
      });
      const data = await res.json();
      setQrCode(data.qrCode);
      setSecret(data.secret);
    };

    fetchQRCode();
  }, []);

  const handleVerify = async () => {
    const res = await fetch("http://localhost:4000/api/auth/enable-2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      setMessage("2FA activée avec succès !");
    } else {
      setMessage("Code invalide, réessaye.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Activer la double authentification</h1>
      {qrCode && (
        <>
          <img src={qrCode} alt="QR Code 2FA" className="mb-4" />
          <p className="mb-2">Scanne ce QR code avec Google Authenticator ou une autre app 2FA.</p>
          <input
            type="text"
            placeholder="Entre le code généré"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border mb-4"
          />
          <button onClick={handleVerify} className="bg-blue-500 text-white px-4 py-2 rounded">
            Vérifier et activer
          </button>
        </>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Enable2FA;

import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div>
      <h1>
        {token
          ? "Réinitialiser le mot de passe"
          : "Demander un lien de réinitialisation"}
      </h1>
      {token ? <ChangePasswordForm token={token} /> : <RequestResetForm />}
    </div>
  );
};

const RequestResetForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("Lien envoyé ! Merci de vérifier vos emails.");
    } else {
      setMessage("Erreur lors de l'envoi.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Adresse e-mail :
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Envoyer le lien</button>
      {message && <p>{message}</p>}
    </form>
  );
};

const ChangePasswordForm = ({ token }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });

    if (res.ok) {
      setMessage("Mot de passe mis à jour !");
    } else {
      setMessage("Erreur : le lien est peut-être expiré.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nouveau mot de passe :
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Réinitialiser</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPassword;

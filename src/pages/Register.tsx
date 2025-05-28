import { useState } from "react";
import logger from './utils/logger';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    newsletter: false,
  });

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [emailValid, setEmailValid] = useState(false);

  const [serverMessage, setServerMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      validatePassword(value);
      setPasswordsMatch(value === formData.confirmPassword);
    }

    if (name === "confirmPassword") {
      setPasswordsMatch(formData.password === value);
    }

    if (name === "email") {
      setEmailValid(validateEmail(value));
    }
  };

  const validatePassword = (password: string) => {
    setPasswordValidity({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[\W_]/.test(password),
    });
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isFormComplete = () => {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      password,
      confirmPassword,
      acceptedTerms,
    } = formData;
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      birthDate.trim() !== "" &&
      email.trim() !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      acceptedTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setServerMessage(null);

    if (!formData.acceptedTerms) {
      setServerMessage({
        type: "error",
        text: "Vous devez accepter les CGU pour continuer.",
      });
      return;
    }

    const allValid = Object.values(passwordValidity).every(Boolean);
    if (!allValid) {
      setServerMessage({
        type: "error",
        text: "Votre mot de passe ne remplit pas tous les critères.",
      });
      return;
    }

    if (!passwordsMatch) {
      setServerMessage({
        type: "error",
        text: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData }),
      });

      const data = await res.json();
      if (res.ok) {
        setServerMessage({ type: "success", text: "Inscription réussie !" });

        setFormData({
          firstName: "",
          lastName: "",
          birthDate: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptedTerms: false,
          newsletter: false,
        });

        setPasswordValidity({
          length: false,
          uppercase: false,
          lowercase: false,
          digit: false,
          specialChar: false,
        });

        setPasswordsMatch(true);

        setEmailValid(false);
      } else {
        setServerMessage({
          type: "error",
          text: data.message || "Erreur lors de l'inscription.",
        });
        logger.log("Erreur backend:", data.message);
      }
    } catch (err) {
      setServerMessage({ type: "error", text: "Erreur serveur." });
    } finally {
      setLoading(false);
    }
  };

  const validStyle = { color: "green" };
  const invalidStyle = { color: "red" };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Inscription</h1>
      {serverMessage && (
        <div
          style={{
            color: serverMessage.type === "error" ? "red" : "green",
            marginBottom: "1rem",
          }}
        >
          {serverMessage.text}
        </div>
      )}
      <input
        name="firstName"
        type="text"
        placeholder="Prénom"
        required
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <input
        name="lastName"
        type="text"
        placeholder="Nom"
        required
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <input
        name="birthDate"
        type="date"
        required
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <div className="text-sm" style={{ color: emailValid ? "green" : "red" }}>
        {formData.email.length > 0 &&
          (emailValid
            ? "✅ Format d'email valide"
            : "❌ Format d'email invalide")}
      </div>
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Mot de passe"
        required
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="ml-2 px-2 py-1 text-sm border rounded"
      >
        {showPassword ? "Cacher" : "Voir"}
      </button>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li style={passwordValidity.length ? validStyle : invalidStyle}>
          Minimum 8 caractères
        </li>
        <li style={passwordValidity.uppercase ? validStyle : invalidStyle}>
          Au moins 1 majuscule
        </li>
        <li style={passwordValidity.lowercase ? validStyle : invalidStyle}>
          Au moins 1 minuscule
        </li>
        <li style={passwordValidity.digit ? validStyle : invalidStyle}>
          Au moins 1 chiffre
        </li>
        <li style={passwordValidity.specialChar ? validStyle : invalidStyle}>
          Au moins 1 caractère spécial
        </li>
      </ul>

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
        required
        onChange={handleChange}
        className="w-full p-2 border"
      />

      <div
        className="text-sm"
        style={{ color: passwordsMatch ? "green" : "red" }}
      >
        {formData.confirmPassword.length > 0 &&
          (passwordsMatch
            ? "✅ Les mots de passe correspondent"
            : "❌ Les mots de passe ne correspondent pas")}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="acceptedTerms"
            onChange={handleChange}
            required
          />{" "}
          J'accepte les CGU *
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" name="newsletter" onChange={handleChange} />{" "}
          S'inscrire à la newsletter
        </label>
      </div>

      <button
        type="submit"
        disabled={
          loading ||
          !Object.values(passwordValidity).every(Boolean) ||
          !passwordsMatch ||
          !emailValid ||
          !isFormComplete()
        }
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Chargement..." : "S'inscrire"}
      </button>
    </form>
  );
};

export default Register;

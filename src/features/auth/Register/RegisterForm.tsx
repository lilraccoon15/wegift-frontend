import React from "react";
import InputField from "../../../components/forms/InputField";
// import Message from "../../components/ui/Message";

interface RegisterFormProps {
    formData: {
        firstName: string;
        lastName: string;
        birthDate: string;
        email: string;
        password: string;
        confirmPassword: string;
        acceptedTerms: boolean;
        newsletter: boolean;
    };
    passwordValidity: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        digit: boolean;
        specialChar: boolean;
    };
    passwordsMatch: boolean;
    emailValid: boolean;
    loading: boolean;
    serverMessage: { type: "error" | "success"; text: string } | null;
    showPassword: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleShowPassword: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isFormComplete: () => boolean;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const validStyle = { color: "green" };
const invalidStyle = { color: "red" };

const RegisterForm: React.FC<RegisterFormProps> = ({
    formData,
    passwordValidity,
    passwordsMatch,
    emailValid,
    loading,
    serverMessage,
    showPassword,
    onChange,
    onToggleShowPassword,
    onSubmit,
    isFormComplete,
    currentStep,
    setCurrentStep,
}) => {
    return (
        <form onSubmit={onSubmit}>
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

            <div className={`form-step ${currentStep === 1 ? "active" : ""}`}>
                <InputField
                    name="firstName"
                    type="text"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={onChange}
                    required
                />

                <InputField
                    name="lastName"
                    type="text"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={onChange}
                    required
                />

                <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-next"
                >
                    Suivant
                </button>
            </div>

            <div className={`form-step ${currentStep === 2 ? "active" : ""}`}>
                <InputField
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={onChange}
                    required
                />
                <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="btn-previous"
                >
                    Précédent
                </button>
                <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="btn-next"
                >
                    Suivant
                </button>
            </div>

            <div className={`form-step ${currentStep === 3 ? "active" : ""}`}>
                <InputField
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={onChange}
                    required
                />
                <div
                    className="text-sm"
                    style={{ color: emailValid ? "green" : "red" }}
                >
                    {formData.email.length > 0 &&
                        (emailValid
                            ? "✅ Format d'email valide"
                            : "❌ Format d'email invalide")}
                </div>

                <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-previous"
                >
                    Précédent
                </button>
                <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="btn-next"
                >
                    Suivant
                </button>
            </div>

            <div className={`form-step ${currentStep === 4 ? "active" : ""}`}>
                <div className="relative">
                    <InputField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={onChange}
                        required
                    />
                    <button
                        type="button"
                        onClick={onToggleShowPassword}
                        className="absolute top-2 right-2 px-2 py-1 text-sm border rounded"
                    >
                        {showPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                            <i className="fa-solid fa-eye"></i>
                        )}
                    </button>
                </div>

                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    <li
                        style={
                            passwordValidity.length ? validStyle : invalidStyle
                        }
                    >
                        Minimum 8 caractères
                    </li>
                    <li
                        style={
                            passwordValidity.uppercase
                                ? validStyle
                                : invalidStyle
                        }
                    >
                        Au moins 1 majuscule
                    </li>
                    <li
                        style={
                            passwordValidity.lowercase
                                ? validStyle
                                : invalidStyle
                        }
                    >
                        Au moins 1 minuscule
                    </li>
                    <li
                        style={
                            passwordValidity.digit ? validStyle : invalidStyle
                        }
                    >
                        Au moins 1 chiffre
                    </li>
                    <li
                        style={
                            passwordValidity.specialChar
                                ? validStyle
                                : invalidStyle
                        }
                    >
                        Au moins 1 caractère spécial
                    </li>
                </ul>

                <InputField
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    required
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
                <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="btn-previous"
                >
                    Précédent
                </button>
                <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="btn-next"
                >
                    Suivant
                </button>
            </div>

            <div className={`form-step ${currentStep === 5 ? "active" : ""}`}>
                <label className="block">
                    <input
                        type="checkbox"
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={onChange}
                        required
                    />{" "}
                    J'accepte les CGU *
                </label>

                <label className="block">
                    <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={onChange}
                    />{" "}
                    S'inscrire à la newsletter
                </label>
                <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="btn-previous"
                >
                    Précédent
                </button>

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
                    {loading ? null : "S'inscrire"}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;

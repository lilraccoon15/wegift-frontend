import React from "react";
import InputField from "../../../components/forms/InputField";
import StepButtons from "../../../components/forms/stepButtons";
import PasswordFields from "../../../components/ui/PasswordFields";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
    formData: {
        pseudo: string;
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
    emailAvailable: boolean;
    birthDateValid: boolean;
    pseudoValid: boolean;
    pseudoAvailable: boolean;
    loading: boolean;
    serverMessage: { type: "error" | "success"; text: string } | null;
    showPassword: boolean;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onRadioGroupShowPassword: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isFormComplete: () => boolean;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    isStepValid: () => boolean;
    showSuccessModal: boolean;
    setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    formData,
    passwordValidity,
    passwordsMatch,
    emailValid,
    emailAvailable,
    pseudoValid,
    pseudoAvailable,
    birthDateValid,
    loading,
    serverMessage,
    showPassword,
    onChange,
    onRadioGroupShowPassword,
    onSubmit,
    isFormComplete,
    currentStep,
    setCurrentStep,
    isStepValid,
    showSuccessModal,
}) => {
    const navigate = useNavigate();

    const redirectAfterRegister = (toLogin: boolean) => {
        const isMobile = window.innerWidth <= 768;
        if (toLogin) {
            navigate(isMobile ? "/login" : "/?mode=login");
        } else {
            navigate("/");
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            onKeyDown={(e) => {
                if (e.key === "Enter" && currentStep !== 5 && isStepValid()) {
                    e.preventDefault();
                    setCurrentStep((prev) => prev + 1);
                }
            }}
        >
            {serverMessage && (
                <div
                    className={` ${
                        serverMessage.type === "error" ? "valid" : "not-valid"
                    }`}
                >
                    {serverMessage.text}
                </div>
            )}

            <div className={`form-step ${currentStep === 1 ? "active" : ""}`}>
                <h2>Etape {currentStep}/5 : Choisissez votre pseudo</h2>
                <label htmlFor="pseudo">
                    Pseudo{" "}
                    <span className="required-marker" aria-hidden="true">
                        *
                    </span>{" "}
                    : <span className="sr-only">(obligatoire)</span>
                </label>
                <div className="input-validation">
                    <InputField
                        id="pseudo"
                        name="pseudo"
                        type="text"
                        placeholder="Pseudo"
                        value={formData.pseudo}
                        onChange={onChange}
                        required
                    />

                    <div
                        className={`input-info ${
                            formData.pseudo.length >= 3
                                ? pseudoValid
                                    ? pseudoAvailable
                                        ? "valid"
                                        : "not-valid"
                                    : "not-valid"
                                : ""
                        }`}
                    >
                        {formData.pseudo.length >= 3 &&
                            (pseudoValid && pseudoAvailable ? (
                                <i className="fa-solid fa-circle-check"></i>
                            ) : (
                                <i className="fa-solid fa-circle-exclamation"></i>
                            ))}
                    </div>

                    {formData.pseudo.length > 0 &&
                        formData.pseudo.length < 3 && (
                            <div className="message not-valid">
                                Le pseudo doit contenir au moins 3 caractères
                            </div>
                        )}

                    {formData.pseudo.length > 20 && (
                        <div className="message not-valid">
                            Le pseudo ne doit pas dépasser 20 caractères
                        </div>
                    )}

                    {formData.pseudo.length >= 3 &&
                        formData.pseudo.length <= 20 &&
                        !/^[a-z0-9_-]+$/.test(formData.pseudo) && (
                            <div className="message not-valid">
                                Le pseudo ne doit contenir que des minuscules,
                                chiffres, tirets ou underscores
                            </div>
                        )}

                    {formData.pseudo.length >= 3 &&
                        /^[a-zA-Z0-9_-]+$/.test(formData.pseudo) &&
                        pseudoValid &&
                        !pseudoAvailable && (
                            <div className="message not-valid">
                                Ce pseudo est déjà pris
                            </div>
                        )}
                </div>
                <StepButtons
                    showNext
                    onNext={() => setCurrentStep(2)}
                    nextDisabled={!isStepValid()}
                />
            </div>

            <div className={`form-step ${currentStep === 2 ? "active" : ""}`}>
                <h2>
                    Etape {currentStep}/5 : Renseignez votre date de naissance
                </h2>
                <label htmlFor="birthdate">
                    Date de naissance{" "}
                    <span className="required-marker" aria-hidden="true">
                        *
                    </span>{" "}
                    : <span className="sr-only">(obligatoire)</span>
                </label>
                <div className="input-validation">
                    <DatePicker
                        id="birthdate"
                        selected={
                            formData.birthDate
                                ? new Date(formData.birthDate)
                                : null
                        }
                        onChange={(date: Date | null) => {
                            onChange({
                                target: {
                                    name: "birthDate",
                                    value: date
                                        ? date.toISOString().split("T")[0]
                                        : "",
                                },
                            } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        placeholderText="JJ/MM/AAAA"
                        maxDate={new Date()}
                        locale={fr}
                        className="input"
                    />
                    {formData.birthDate && (
                        <>
                            <div
                                className={`input-info ${
                                    birthDateValid ? "valid" : "not-valid"
                                }`}
                            >
                                {birthDateValid ? (
                                    <i className="fa-solid fa-circle-check"></i>
                                ) : (
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                )}
                            </div>
                            {!birthDateValid && (
                                <div className="message not-valid">
                                    La date ne naissance n'est pas valide
                                </div>
                            )}
                        </>
                    )}
                </div>
                <StepButtons
                    showPrevious
                    onPrevious={() => setCurrentStep(1)}
                    showNext
                    onNext={() => setCurrentStep(3)}
                    nextDisabled={!isStepValid()}
                />
            </div>

            <div className={`form-step ${currentStep === 3 ? "active" : ""}`}>
                <h2>Etape {currentStep}/5 : Renseignez votre adresse email</h2>
                <label htmlFor="email">
                    Adresse email{" "}
                    <span className="required-marker" aria-hidden="true">
                        *
                    </span>{" "}
                    : <span className="sr-only">(obligatoire)</span>
                </label>
                <div className="input-validation">
                    <InputField
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                    <div
                        className={`input-info ${
                            emailValid && emailAvailable ? "valid" : "not-valid"
                        }`}
                    >
                        {formData.email.length > 0 &&
                            (emailValid && emailAvailable ? (
                                <i className="fa-solid fa-circle-check"></i>
                            ) : (
                                <i className="fa-solid fa-circle-exclamation"></i>
                            ))}
                    </div>

                    {formData.email.length > 0 && !emailValid && (
                        <div className="message not-valid">
                            L'adresse email n'est pas valide
                        </div>
                    )}

                    {formData.email.length > 0 &&
                        emailValid &&
                        !emailAvailable && (
                            <div className="message not-valid">
                                Cette adresse email est déjà prise
                            </div>
                        )}
                </div>

                <StepButtons
                    showPrevious
                    onPrevious={() => setCurrentStep(2)}
                    showNext
                    onNext={() => setCurrentStep(4)}
                    nextDisabled={!isStepValid()}
                />
            </div>

            <div className={`form-step ${currentStep === 4 ? "active" : ""}`}>
                <h2>Etape {currentStep}/5 : Choisissez votre mot de passe</h2>
                <PasswordFields
                    newPassword={formData.password}
                    confirmPassword={formData.confirmPassword}
                    onNewPasswordChange={onChange}
                    onConfirmPasswordChange={onChange}
                    onToggleShowNewPassword={onRadioGroupShowPassword}
                    showNewPassword={showPassword}
                    passwordValidity={passwordValidity}
                    passwordsMatch={passwordsMatch}
                    labels={{
                        newPassword: "Mot de passe",
                        confirmPassword: "Confirmer le mot de passe",
                    }}
                />
                <StepButtons
                    showPrevious
                    onPrevious={() => setCurrentStep(3)}
                    showNext
                    onNext={() => setCurrentStep(5)}
                    nextDisabled={!isStepValid()}
                />
            </div>

            <div className={`form-step ${currentStep === 5 ? "active" : ""}`}>
                <h2>Etape {currentStep}/5 : Indiquez vos préférences</h2>
                <label htmlFor="acceptedTerms">
                    J'accepte les CGU{" "}
                    <span className="required-marker" aria-hidden="true">
                        *
                    </span>{" "}
                    : <span className="sr-only">(obligatoire)</span>
                </label>
                <input
                    id="acceptedTerms"
                    type="checkbox"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={onChange}
                    required
                    className="switch"
                />{" "}
                <label htmlFor="newsletter">S'inscrire à la newsletter ?</label>
                <input
                    id="newsletter"
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={onChange}
                    className="switch"
                />
                {showSuccessModal && (
                    <ConfirmModal
                        title="Inscription réussie"
                        message={`Bienvenue !\n\nVous devez activer votre compte en cliquant sur le lien envoyé à ${formData.email} avant de pouvoir vous connecter.`}
                        confirmLabel="Se connecter"
                        onConfirm={() => redirectAfterRegister(true)}
                        onClose={() => redirectAfterRegister(true)}
                    />
                )}
                <StepButtons
                    showPrevious
                    onPrevious={() => setCurrentStep(4)}
                    showSubmit
                    submitDisabled={
                        loading ||
                        !Object.values(passwordValidity).every(Boolean) ||
                        !passwordsMatch ||
                        !emailValid ||
                        !isFormComplete()
                    }
                    isLoading={loading}
                />
            </div>
        </form>
    );
};

export default RegisterForm;

import React from "react";
import InputField from "../../../components/forms/InputField";
import StepButtons from "../../../components/forms/stepButtons";
import PasswordFields from "../../../components/ui/PasswordFields";
// import Message from "../../components/ui/Message";

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
    birthDateValid: boolean;
    pseudoValid: boolean;
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
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    formData,
    passwordValidity,
    passwordsMatch,
    emailValid,
    pseudoValid,
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
}) => {
    return (
        <form onSubmit={onSubmit}>
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
                <label>Pseudo :</label>
                <div className="input-validation">
                    <InputField
                        name="pseudo"
                        type="text"
                        placeholder="Pseudo"
                        value={formData.pseudo}
                        onChange={onChange}
                        required
                    />

                    <span
                        className={`input-info ${
                            pseudoValid ? "valid" : "not-valid"
                        }`}
                    >
                        {formData.pseudo.length > 0 &&
                            (pseudoValid ? (
                                <i className="fa-solid fa-circle-check"></i>
                            ) : (
                                <i className="fa-solid fa-circle-exclamation"></i>
                            ))}
                    </span>
                </div>
                <StepButtons
                    showNext
                    onNext={() => setCurrentStep(2)}
                    nextDisabled={!isStepValid()}
                />
            </div>

            <div className={`form-step ${currentStep === 2 ? "active" : ""}`}>
                <label>Date de naissance :</label>
                <div className="input-validation">
                    <InputField
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={onChange}
                        required
                    />
                    {formData.birthDate && (
                        <span
                            className={`input-info ${
                                birthDateValid ? "valid" : "not-valid"
                            }`}
                        >
                            {birthDateValid ? (
                                <i className="fa-solid fa-circle-check"></i>
                            ) : (
                                <i className="fa-solid fa-circle-exclamation"></i>
                            )}
                        </span>
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
                <label>Adresse email :</label>
                <div className="input-validation">
                    <InputField
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                    <span
                        className={`input-info ${
                            emailValid ? "valid" : "not-valid"
                        }`}
                    >
                        {formData.email.length > 0 &&
                            (emailValid ? (
                                <i className="fa-solid fa-circle-check"></i>
                            ) : (
                                <i className="fa-solid fa-circle-exclamation"></i>
                            ))}
                    </span>
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
                <label className="block">
                    <input
                        type="checkbox"
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={onChange}
                        required
                        className="switch"
                    />{" "}
                    J'accepte les CGU *
                </label>

                <label className="block">
                    <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={onChange}
                        className="switch"
                    />{" "}
                    S'inscrire à la newsletter
                </label>
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

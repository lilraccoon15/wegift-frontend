import BackButton from "../../components/ui/BackButton";
import API_URL from "../../config";
import RegisterForm from "../../features/auth/Register/RegisterForm";
import { useManageRegister } from "../../features/auth/Register/useManageRegister";

const Register = () => {
    const {
        formData,
        passwordValidity,
        passwordsMatch,
        emailValid,
        pseudoValid,
        birthDateValid,
        loading,
        serverMessage,
        showPassword,
        handleChange,
        RadioGroupShowPassword,
        handleSubmit,
        isFormComplete,
        currentStep,
        setCurrentStep,
        isStepValid,
    } = useManageRegister();

    const handleGoogleSignup = () => {
        window.location.href = `${API_URL}/api/auth/oauth/google`;
    };

    return (
        <>
            <div className="title-return">
                <BackButton />
                <h1>Inscription</h1>
            </div>
            <RegisterForm
                formData={formData}
                passwordValidity={passwordValidity}
                passwordsMatch={passwordsMatch}
                emailValid={emailValid}
                pseudoValid={pseudoValid}
                birthDateValid={birthDateValid}
                loading={loading}
                serverMessage={serverMessage}
                showPassword={showPassword}
                onChange={handleChange}
                onRadioGroupShowPassword={RadioGroupShowPassword}
                onSubmit={handleSubmit}
                isFormComplete={isFormComplete}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                isStepValid={isStepValid}
            />

            <div className="divider-or">
                <span>ou</span>
            </div>

            <button className="btn google-btn" onClick={handleGoogleSignup}>
                <i className="fa-brands fa-google" />
                S’inscrire avec Google
            </button>
        </>
    );
};

export default Register;

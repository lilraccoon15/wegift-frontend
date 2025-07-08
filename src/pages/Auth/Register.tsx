import RegisterForm from "../../features/auth/Register/RegisterForm";
import { useManageRegister } from "../../features/auth/Register/useManageRegister";

const Register = () => {
  const {
    formData,
    passwordValidity,
    passwordsMatch,
    emailValid,
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

  return (
    <>
      <h1>Inscription</h1>
      <RegisterForm
        formData={formData}
        passwordValidity={passwordValidity}
        passwordsMatch={passwordsMatch}
        emailValid={emailValid}
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
    </>
  );
};

export default Register;

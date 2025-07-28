import { useEffect, useState } from "react";
import {
  checkEmailAvailability,
  checkPseudoAvailability,
  registerUser,
} from "./RegisterHelpers";

export const useManageRegister = () => {
  const [formData, setFormData] = useState({
    pseudo: "",
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
  const [pseudoValid, setPseudoValid] = useState(false);
  const [birthDateValid, setBirthDateValid] = useState(false);
  const [serverMessage, setServerMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.pseudo.trim().length > 0 && pseudoValid;
      case 2:
        return formData.birthDate.trim().length > 0 && birthDateValid;
      case 3:
        return formData.email.trim().length > 0 && emailValid;
      case 4:
        return (
          formData.password.length > 0 &&
          Object.values(passwordValidity).every(Boolean) &&
          formData.confirmPassword.length > 0 &&
          passwordsMatch
        );
      case 5:
        return formData.acceptedTerms;
      default:
        return false;
    }
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!validateEmail(formData.email)) {
        setEmailValid(false);
        return;
      }

      const isAvailable = await checkEmailAvailability(formData.email);
      setEmailValid(isAvailable);
    }, 400);

    return () => clearTimeout(delay);
  }, [formData.email]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (formData.pseudo.trim().length < 3) {
        setPseudoValid(false);
        return;
      }

      const isAvailable = await checkPseudoAvailability(formData.pseudo);
      setPseudoValid(isAvailable);
    }, 400);

    return () => clearTimeout(delay);
  }, [formData.pseudo]);

  useEffect(() => {
    setBirthDateValid(validateBirthDate(formData.birthDate));
  }, [formData.birthDate]);

  const validateBirthDate = (birthDate: string): boolean => {
    const birth = new Date(birthDate);
    const today = new Date();

    if (isNaN(birth.getTime())) return false; // date invalide
    if (birth > today) return false; // date dans le futur

    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);

    if (birth < hundredYearsAgo) return false; // date trop ancienne

    const age = today.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() >= birth.getDate());

    const realAge = hasHadBirthdayThisYear ? age : age - 1;

    return realAge >= 12;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));

    if (name === "password") {
      validatePassword(value);
      setPasswordsMatch(value === formData.confirmPassword);
    }

    if (name === "confirmPassword") {
      setPasswordsMatch(formData.password === value);
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
      pseudo,
      birthDate,
      email,
      password,
      confirmPassword,
      acceptedTerms,
    } = formData;
    return (
      pseudo.trim() !== "" &&
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
      const res = await registerUser(userData);

      if (res.success) {
        setServerMessage({
          type: "success",
          text: res.message || "Inscription réussie !",
        });

        setFormData({
          pseudo: "",
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
          text: res.error || "Erreur lors de l'inscription.",
        });
      }
    } catch {
      setServerMessage({
        type: "error",
        text: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const RadioGroupShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return {
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
  };
};

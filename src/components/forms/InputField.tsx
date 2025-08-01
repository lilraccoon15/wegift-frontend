import type { FC } from "react";

interface InputFieldProps {
  inputMode?: "decimal" | "numeric" | "text" | "tel" | "email" | "url";
  id?: string;
  type?: string;
  name?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  isTextArea?: boolean;
  rows?: number;
}

const InputField: FC<InputFieldProps> = ({
  inputMode,
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
  disabled = false,
  minLength,
  maxLength,
  min,
  max,
  step,
  isTextArea = false,
  rows = 4,
}) => {
  if (isTextArea) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        className={className}
      />
    );
  }
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      className={className}
      inputMode={inputMode}
    />
  );
};

export default InputField;

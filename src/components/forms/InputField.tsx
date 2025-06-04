import type { FC } from "react";

interface Option {
  value: string;
  label: string;
}

interface InputFieldProps {
  type?: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: Option[];
  multiline?: boolean;
}

const InputField: FC<InputFieldProps> = ({
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
  options,
  multiline = false,
}) => {
  if (multiline) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        className={`border p-2 rounded w-full ${className}`}
      />
    );
  }

  if (type === "select" && options) {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`border p-2 rounded w-full ${className}`}
      >
        <option value="" disabled>
          {placeholder || "Sélectionnez..."}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === "file") {
    return (
      <input
        type="file"
        name={name}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`border p-2 rounded w-full ${className}`}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      minLength={minLength}
      maxLength={maxLength}
      className={`border p-2 rounded w-full ${className}`}
    />
  );
};

export default InputField;

import type { FC } from "react";

interface InputFieldProps {
    type?: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
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
}) => {
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
            className={`${className}`}
        />
    );
};

export default InputField;

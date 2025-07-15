import type { FC } from "react";

interface InputFieldProps {
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
    isTextArea?: boolean;
    rows?: number;
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
    isTextArea = false,
    rows = 4,
}) => {
    if (isTextArea) {
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
                rows={rows}
                className={className}
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
            className={className}
        />
    );
};

export default InputField;

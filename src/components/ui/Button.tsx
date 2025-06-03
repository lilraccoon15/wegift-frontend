import type { FC, ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
    onClick,
    disabled = false,
    children,
    className = "",
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        bg-blue-500 
        text-white 
        px-4 
        py-2 
        rounded 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        hover:bg-blue-600 
        transition-colors
        ${className}
      `}
        >
            {children}
        </button>
    );
};

export default Button;

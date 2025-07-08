import type { FC, ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="btn">
      {children}
    </button>
  );
};

export default Button;

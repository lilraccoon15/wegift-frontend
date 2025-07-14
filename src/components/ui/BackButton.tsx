import { useNavigate } from "react-router-dom";

interface BackButtonProps {
    className?: string;
    label?: string;
}

const BackButton = ({ className = "", label = "Retour" }: BackButtonProps) => {
    const navigate = useNavigate();

    return (
        <i
            className={`fa-solid fa-arrow-left ${className}`}
            onClick={() => navigate(-1)}
            role="button"
            aria-label={label}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate(-1);
            }}
        ></i>
    );
};

export default BackButton;

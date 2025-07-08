import React from "react";

interface StepButtonsProps {
    showPrevious?: boolean;
    onPrevious?: () => void;
    showNext?: boolean;
    onNext?: () => void;
    showSubmit?: boolean;
    onSubmit?: () => void;
    submitDisabled?: boolean;
    isLoading?: boolean;
    nextDisabled?: boolean;
}

const StepButtons: React.FC<StepButtonsProps> = ({
    showPrevious,
    onPrevious,
    showNext,
    onNext,
    showSubmit,
    onSubmit,
    submitDisabled,
    isLoading,
    nextDisabled
}) => {
    const buttonCount =
    Number(!!showPrevious) + Number(!!showNext) + Number(!!showSubmit);
    console.log(buttonCount);

return (
    <div className={`step-btn ${buttonCount === 1 ? "single" : ""}`}>
            {showPrevious && (
                <button type="button" onClick={onPrevious} className="btn previous">
                    <i className="fa-solid fa-chevron-left"></i> Précédent
                </button>
            )}

            {showNext && (
                <button type="button" onClick={onNext} className="btn next" disabled={nextDisabled}>
                    Suivant <i className="fa-solid fa-chevron-right"></i>
                </button>
            )}

            {showSubmit && (
                <button
                    type="submit"
                    onClick={onSubmit}
                    disabled={submitDisabled}
                    className={`btn ${
                        isLoading ? "disabled" : ""
                    }`}
                >
                    {isLoading ? null : "S'inscrire"}
                </button>
            )}
        </div>
    );
};

export default StepButtons;

interface EditNewsletterProps {
    newsletter: boolean;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSubmitting: boolean;
    submitError: string | null;
}

const EditNewsletter: React.FC<EditNewsletterProps> = ({
    newsletter,
    handleCheckboxChange,
    isSubmitting,
    submitError,
}) => {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                />
                Recevoir la newsletter
            </label>
            {submitError && <p style={{ color: "red" }}>{submitError}</p>}
        </div>
    );
};

export default EditNewsletter;

import Button from "../../components/ui/Button";
import InputField from "../../components/forms/InputField";
import Message from "../../components/ui/Message";

interface TwoFAFormProps {
    code: string;
    error: string | null;
    onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    disabled?: boolean;
}

const TwoFAForm: React.FC<TwoFAFormProps> = ({
    code,
    error,
    onCodeChange,
    onSubmit,
    disabled = false,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <InputField
                type="text"
                placeholder="Code 2FA"
                value={code}
                onChange={onCodeChange}
                required
                className="mb-2"
            />
            {error && <Message text={error} type="error" />}
            <Button
                type="submit"
                disabled={disabled}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                Valider code 2FA
            </Button>
        </form>
    );
};

export default TwoFAForm;

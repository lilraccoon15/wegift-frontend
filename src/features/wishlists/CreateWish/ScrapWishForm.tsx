import InputField from "../../../components/forms/InputField";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";

export interface ScrapWishFormProps {
    onSubmitScrapping: (e: React.FormEvent<HTMLFormElement>) => void;
    url: string;
    onUrlChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    errorScrapping: string | null;
    buttondisabledScrapping: boolean;
}

const ScrapWishForm = ({
    onSubmitScrapping,
    url,
    onUrlChange,
    errorScrapping,
    buttondisabledScrapping,
}: ScrapWishFormProps) => {
    return (
        <form onSubmit={onSubmitScrapping} encType="multipart/form-data">
            <InputField
                type="text"
                placeholder="URL"
                value={url}
                onChange={onUrlChange}
                required
            />
            {errorScrapping && <Message text={errorScrapping} type="error" />}
            <Button type="submit" disabled={buttondisabledScrapping}>
                Créer
            </Button>
        </form>
    );
};

export default ScrapWishForm;

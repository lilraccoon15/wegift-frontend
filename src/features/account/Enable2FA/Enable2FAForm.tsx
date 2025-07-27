import React from "react";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";
import InputField from "../../../components/forms/InputField";

type Props = {
    qrCodeUrl: string | null;
    code: string;
    is2FAEnabled: boolean;
    error: Error | null;
    message: string | null;
    onCodeChange: (val: string) => void;
    onEnable: () => void;
    onDisable: () => void;
};

const Enable2FAForm: React.FC<Props> = ({
    qrCodeUrl,
    code,
    is2FAEnabled,
    error,
    message,
    onCodeChange,
    onEnable,
    onDisable,
}) => {
    return (
        <>
            {error && <Message type="error" text={error.message} />}
            {message && <Message type="success" text={message} />}

            {is2FAEnabled ? (
                <>
                    <p>
                        La double authentification est activée sur votre compte.
                    </p>
                    <Button onClick={onDisable}>Désactiver la 2FA</Button>
                </>
            ) : (
                <>
                    {qrCodeUrl ? (
                        <>
                            <img src={qrCodeUrl} alt="QR Code 2FA" />
                            <p>
                                Scannez ce QR code avec votre application
                                d'authentification (Google Authenticator, Authy,
                                etc.)
                            </p>

                            <InputField
                                type="text"
                                placeholder="Saisissez le code généré"
                                value={code}
                                onChange={(e) => onCodeChange(e.target.value)}
                            />

                            <Button onClick={onEnable}>
                                Activer la double authentification
                            </Button>
                        </>
                    ) : (
                        <p>Chargement du QR code...</p>
                    )}
                </>
            )}
        </>
    );
};

export default Enable2FAForm;

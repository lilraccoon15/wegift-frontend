import { useEffect, useState } from "react";
import {
    disable2FA,
    enable2FA,
    fetch2FAStatus,
    generate2FA,
} from "./Enable2FAHelpers";

export const useManageEnable2FA = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [_secret, setSecret] = useState<string | null>(null);
    const [code, setCode] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            setLoading(true);
            try {
                const statusData = await fetch2FAStatus();
                if (statusData.success) {
                    if (statusData.data.is2FAEnabled) {
                        setIs2FAEnabled(true);
                        setMessage("2FA déjà activée");
                        setQrCodeUrl(null);
                        setSecret(null);
                    } else {
                        setIs2FAEnabled(false);
                        const genData = await generate2FA();
                        if (genData.success) {
                            setQrCodeUrl(genData.data.qrCodeDataURL);
                            setSecret(genData.data.secret);
                            setMessage(null);
                            setError(null);
                        } else {
                            setError(
                                new Error("Erreur lors de la génération 2FA")
                            );
                        }
                    }
                } else {
                    setError(
                        new Error("Impossible de récupérer le statut 2FA")
                    );
                }
            } catch {
                setError(new Error("Impossible de récupérer le statut 2FA"));
            } finally {
                setLoading(false);
            }
        }

        init();
    }, []);

    const handleEnable = async () => {
        setError(null);
        setMessage(null);

        if (!code) {
            setError(new Error("Veuillez saisir le code 2FA"));
            return;
        }

        try {
            const result = await enable2FA(code);
            if (result.success) {
                setMessage("2FA activée avec succès !");
                setIs2FAEnabled(true);
                setQrCodeUrl(null);
                setSecret(null);
            } else {
                setError(result.message || "Code invalide");
            }
        } catch {
            setError(new Error("Erreur lors de l'activation 2FA"));
        }
    };

    const handleDisable = async () => {
        setError(null);
        setMessage(null);

        try {
            const result = await disable2FA();
            if (result.success) {
                setMessage("2FA désactivée avec succès");
                setIs2FAEnabled(false);
                const genData = await generate2FA();
                if (genData.success) {
                    setQrCodeUrl(genData.data.qrCodeDataURL);
                    setSecret(genData.data.secret);
                }
            } else {
                setError(
                    result.message || "Erreur lors de la désactivation 2FA"
                );
            }
        } catch {
            setError(new Error("Erreur lors de la désactivation 2FA"));
        }
    };

    return {
        qrCodeUrl,
        code,
        is2FAEnabled,
        error,
        loading,
        message,
        setCode,
        handleEnable,
        handleDisable,
    };
};

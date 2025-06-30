import Enable2FAForm from "../../features/account/Enable2FA/Enable2FAForm";
import { useManageEnable2FA } from "../../features/account/Enable2FA/useManageEnable2FA";

const Enable2FA = () => {
    const {
        qrCodeUrl,
        code,
        is2FAEnabled,
        error,
        message,
        setCode,
        handleEnable,
        handleDisable,
    } = useManageEnable2FA();

    return (
        <Enable2FAForm
            qrCodeUrl={qrCodeUrl}
            code={code}
            is2FAEnabled={is2FAEnabled}
            error={error}
            message={message}
            onCodeChange={setCode}
            onEnable={handleEnable}
            onDisable={handleDisable}
        />
    );
};

export default Enable2FA;

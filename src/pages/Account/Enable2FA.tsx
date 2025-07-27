import { useNavigate } from "react-router-dom";
import Enable2FAForm from "../../features/account/Enable2FA/Enable2FAForm";
import { useManageEnable2FA } from "../../features/account/Enable2FA/useManageEnable2FA";
import BackButton from "../../components/ui/BackButton";
import DataState from "../../components/ui/DataState";

const Enable2FA = () => {
    const {
        qrCodeUrl,
        code,
        is2FAEnabled,
        error,
        loading,
        message,
        setCode,
        handleEnable,
        handleDisable,
    } = useManageEnable2FA();
    const navigate = useNavigate();

    return (
        <DataState loading={loading} error={error}>
            <div className="title-return">
                <BackButton />
                <h1>Double authentification</h1>
            </div>
            <div className="frame">
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
            </div>
        </DataState>
    );
};

export default Enable2FA;

import { useNavigate } from "react-router-dom";
import { useManageActivation } from "../../features/auth/Login/useManageActivation";

const ActivatePage = () => {
    const navigate = useNavigate();

    const { message, error } = useManageActivation(navigate);

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <h1 className="text-xl font-bold">Activation du compte</h1>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ActivatePage;

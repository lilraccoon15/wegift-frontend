import { useNavigate } from "react-router-dom";
import { useManageActivation } from "../../features/auth/Login/useManageActivation";

const ActivatePage = () => {
  const navigate = useNavigate();

  const { message, error } = useManageActivation(navigate);

  return (
    <div>
      <h1>Activation du compte</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ActivatePage;

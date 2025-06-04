import { useSearchParams } from "react-router-dom";
import ChangePasswordForm from "../../features/auth/ResetPassword/ChangePasswordForm";
import RequestResetForm from "../../features/auth/ResetPassword/ResetPasswordForm";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        {token ? "Réinitialiser le mot de passe" : "Demander un lien de réinitialisation"}
      </h1>

      {token ? <ChangePasswordForm token={token} /> : <RequestResetForm />}
    </div>
  );
};

export default ResetPassword;

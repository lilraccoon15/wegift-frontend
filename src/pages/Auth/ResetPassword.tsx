import { useSearchParams } from "react-router-dom";
import ChangePasswordForm from "../../features/auth/ResetPassword/ChangePasswordForm";
import RequestResetForm from "../../features/auth/ResetPassword/ResetPasswordForm";
import BackButton from "../../components/ui/BackButton";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    return (
        <>
            <div className="title-return">
                <BackButton />
                <h1>
                    {token
                        ? "Réinitialiser le mot de passe"
                        : "Demander un lien de réinitialisation"}
                </h1>
            </div>
            <div className="frame">
                {token ? (
                    <ChangePasswordForm token={token} />
                ) : (
                    <RequestResetForm />
                )}
            </div>
        </>
    );
};

export default ResetPassword;

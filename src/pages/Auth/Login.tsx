import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../features/auth/Login/LoginForm";
import TwoFAForm from "../../features/auth/Login/2FAForm";
import Message from "../../components/ui/Message";
import { useManageLogin } from "../../features/auth/Login/useManageLogin";

const Login = () => {
    const navigate = useNavigate();

    const {
        loading,
        requires2FA,
        email,
        setEmail,
        password,
        setPassword,
        handleLoginSubmit,
        error,
        twoFACode,
        setTwoFACode,
    } = useManageLogin(navigate);

    if (loading) return null;

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <h1 className="text-xl font-bold">Connexion</h1>

            {!requires2FA ? (
                <>
                    <LoginForm
                        email={email}
                        onEmailChange={(e) => setEmail(e.target.value)}
                        password={password}
                        onPasswordChange={(e) => setPassword(e.target.value)}
                        onSubmit={handleLoginSubmit}
                        error={error}
                        disabled={loading}
                        buttonClassName="bg-green-600 hover:bg-green-700"
                    />
                    <div className="text-right mt-2">
                        <Link
                            to="/reset-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>
                </>
            ) : (
                <TwoFAForm
                    code={twoFACode}
                    onCodeChange={(e) => setTwoFACode(e.target.value)}
                    onSubmit={handleLoginSubmit}
                    error={error}
                />
            )}

            {error && <Message type="error" text={error} />}
        </div>
    );
};

export default Login;

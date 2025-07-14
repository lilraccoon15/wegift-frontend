import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../features/auth/Login/LoginForm";
import TwoFAForm from "../../features/auth/Login/2FAForm";
import Message from "../../components/ui/Message";
import { useManageLogin } from "../../features/auth/Login/useManageLogin";
import BackButton from "../../components/ui/BackButton";

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
        <>
            <div className="title-return">
                <BackButton />
                <h1>Connexion</h1>
            </div>

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
                    />
                    <div>
                        <Link to="/reset-password">Mot de passe oublié ?</Link>
                    </div>

                    <div className="oauth-section">
                        <p>Ou connectez-vous avec :</p>
                        <a
                            href="http://localhost:3001/oauth/google"
                            className="btn btn-google"
                        >
                            Continuer avec Google
                        </a>
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
        </>
    );
};

export default Login;

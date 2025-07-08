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
    <>
      <h1>Connexion</h1>

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

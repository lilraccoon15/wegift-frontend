import { Link } from "react-router-dom";

const NavLeft = () => {
  // const { isAuthenticated, loading } = useAuth();

  // if (loading || !isAuthenticated) return null;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_AUTH;

  const PICTURE = "/img/logo.png";

  return (
    <Link to="/">
      <img
        className="logo"
        src={`${BACKEND_URL}${PICTURE}`}
        alt="logo wegift"
      />
    </Link>
  );
};

export default NavLeft;

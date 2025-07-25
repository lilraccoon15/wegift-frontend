import { useAuth } from "../../../context/AuthContext";

const NavLeft = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading || !isAuthenticated) return null;

  return <h1>WeGift</h1>;
};

export default NavLeft;

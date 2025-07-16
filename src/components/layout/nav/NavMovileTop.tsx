import { useAuth } from "../../../context/AuthContext";

const NavMobileTop = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading || !isAuthenticated) return null;

  return <></>;
};

export default NavMobileTop;

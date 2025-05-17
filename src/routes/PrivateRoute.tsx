import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;

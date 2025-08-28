import AppRouter from "./routes/AppRouter";
import { useMyAccount } from "./features/account/MyAccountHelpers";
import DataState from "./components/ui/DataState";
import { useAuthRedirectOn401 } from "./utils/useAuthRedirectOn401";
import { useAuth } from "./context/AuthContext";

const AppWrapper = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { error, isLoading: accountLoading } = useMyAccount();

  useAuthRedirectOn401(error);

  if (authLoading || accountLoading || isAuthenticated === null) {
    return (
      <DataState loading={true} error={null}>
        <></>
      </DataState>
    );
  }

  return <AppRouter />;
};

export default AppWrapper;

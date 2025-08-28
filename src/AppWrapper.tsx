import AppRouter from "./routes/AppRouter";
import { useMyAccount } from "./features/account/MyAccountHelpers";
import DataState from "./components/ui/DataState";
import { useAuthRedirectOn401 } from "./utils/useAuthRedirectOn401";
import { useAuth } from "./context/AuthContext";

const AppWrapper = () => {
  const { loading: authLoading } = useAuth();
  const { error, isLoading: accountLoading } = useMyAccount();

  useAuthRedirectOn401(error);

  const isLoading = authLoading || accountLoading;

  return (
    <DataState loading={isLoading} error={error}>
      <AppRouter />
    </DataState>
  );
};

export default AppWrapper;

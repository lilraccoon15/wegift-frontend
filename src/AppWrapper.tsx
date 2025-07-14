import AppRouter from "./routes/AppRouter";
import { useMyAccount } from "./features/account/MyAccountHelpers";
import DataState from "./components/ui/DataState";
import { useAuthRedirectOn401 } from "./utils/useAuthRedirectOn401";

const AppWrapper = () => {
    const { data: _account, error, isLoading } = useMyAccount();

    useAuthRedirectOn401(error);

    return (
        <DataState loading={isLoading} error={error}>
            <AppRouter />
        </DataState>
    );
};

export default AppWrapper;

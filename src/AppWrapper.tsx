import AppRouter from "./routes/AppRouter";
import DataState from "./components/ui/DataState";
import { useAuth } from "./context/AuthContext";

const AppWrapper = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <DataState loading={true} error={null}>
        <></>
      </DataState>
    );
  }

  return <AppRouter />;
};

export default AppWrapper;

import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { useAuth } from './context/AuthContext';

function App() {

  const { loading } = useAuth();

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

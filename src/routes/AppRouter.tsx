import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Layout from '../components/layout/Layout';
import Register from '../pages/Register';
import ActivatePage from '../pages/Activation';

const AppRouter = () => {
  return (
    <Layout>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate" element={<ActivatePage />} />
        <Route
        path="/dashboard"
        element={
            <PrivateRoute>
            <Dashboard />
            </PrivateRoute>
        }
        />
        </Routes>
    </Layout>
  );
};

export default AppRouter;

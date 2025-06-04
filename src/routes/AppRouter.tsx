import { Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import ActivatePage from "../pages/auth/Activation";
import MyProfile from "../pages/profile/MyProfile";
import EditProfile from "../pages/profile/EditProfile";
import MyAccount from "../pages/account/MyAccount";

const PrivateOutlet = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/activate" element={<ActivatePage />} />

        <Route element={<PrivateOutlet />}>
          <Route path="/profile/me" element={<MyProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<MyAccount />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default AppRouter;

import { Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import ActivatePage from "../pages/Auth/Activation";
import MyProfile from "../pages/Profile/MyProfile";
import EditProfile from "../pages/Profile/EditProfile";
import MyAccount from "../pages/Account/MyAccount";
import MyWishlists from "../pages/Wishlists/MyWishlists";
import MyWishlist from "../pages/Wishlists/MyWishlist";

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
          <Route path="/my-wishlists" element={<MyWishlists />} />
          <Route path="/my-wishlist/:id" element={<MyWishlist />} />
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

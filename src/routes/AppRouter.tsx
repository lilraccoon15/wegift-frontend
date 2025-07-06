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
import ViewProfile from "../pages/Profile/ViewProfile";
import MyWish from "../pages/Wishlists/MyWish";
import Notifications from "../pages/Notifications/Notifications";
import Research from "../pages/Research/Research";
import MyExchanges from "../pages/Exchanges/MyExchanges";

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
                <Route path="/profile/:id" element={<ViewProfile />} />

                <Route element={<PrivateOutlet />}>
                    <Route path="/wishlists" element={<MyWishlists />} />
                    <Route path="/wishlist/:id" element={<MyWishlist />} />
                    <Route path="/wish/:id" element={<MyWish />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/account" element={<MyAccount />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/search" element={<Research />} />
                    <Route path="/my-exchanges" element={<MyExchanges />} />
                </Route>
            </Routes>
        </Layout>
    );
};

export default AppRouter;

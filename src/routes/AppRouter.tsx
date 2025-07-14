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
import MyFriends from "../pages/Profile/MyFriends";
import Friends from "../pages/Profile/Friends";
import Wishlists from "../pages/Wishlists/Wishlists";
import Wishlist from "../pages/Wishlists/Wishlist";
import EditEmail from "../pages/Account/EditEmail";
import EditPassword from "../pages/Account/EditPassword";
import Enable2FA from "../pages/Account/Enable2FA";
import Preferences from "../pages/Account/Preferences";
import OAuthSuccess from "../pages/Auth/OAuthSuccess";
import ManageGoogleLink from "../pages/Account/ManageGoogleLink";
import CreatePassword from "../pages/Auth/CreatePassword";

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
                <Route path="/oauth/success" element={<OAuthSuccess />} />

                <Route element={<PrivateOutlet />}>
                    <Route path="/my-wishlists" element={<MyWishlists />} />
                    <Route path="/my-wishlist/:id" element={<MyWishlist />} />
                    <Route path="/my-wish/:id" element={<MyWish />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/account" element={<MyAccount />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/search" element={<Research />} />
                    <Route path="/my-exchanges" element={<MyExchanges />} />
                    <Route path="/profile/:id" element={<ViewProfile />} />
                    <Route path="/my-friends" element={<MyFriends />} />
                    <Route path="/friends/:id" element={<Friends />} />
                    <Route path="/wishlists/:id" element={<Wishlists />} />
                    <Route path="/wishlist/:id" element={<Wishlist />} />
                    <Route path="/account/edit-email" element={<EditEmail />} />
                    <Route
                        path="/account/edit-password"
                        element={<EditPassword />}
                    />
                    <Route path="/account/2FA" element={<Enable2FA />} />
                    <Route
                        path="/account/preferences"
                        element={<Preferences />}
                    />
                    <Route
                        path="/account/google-link"
                        element={<ManageGoogleLink />}
                    />
                    <Route path="/set-password" element={<CreatePassword />} />
                </Route>
            </Routes>
        </Layout>
    );
};

export default AppRouter;

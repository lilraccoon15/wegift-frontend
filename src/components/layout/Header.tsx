import { useAuth } from "../../context/AuthContext";
import ResponsiveNav from "./nav/ResponsiveNav";

const Header = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading || isAuthenticated === null) {
        return null;
    }

    return (
        <header className={isAuthenticated ? "auth" : "no-auth"}>
            <div className="header-top">
                <h1>WeGift</h1>
                <div className="nav-mobile-top-wrapper">
                    <ResponsiveNav.MobileTop />
                </div>
            </div>
            <ResponsiveNav />
        </header>
    );
};

export default Header;

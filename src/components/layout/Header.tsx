import { useAuth } from "../../context/AuthContext";
import NavLeft from "./nav/NavLeft";
import NavRight from "./nav/NavRight";

const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <header>
                <div className="header-left">
                    <NavLeft />
                </div>
            </header>
            <div
                className={`header-right ${
                    isAuthenticated ? "auth" : "no-auth"
                }`}
            >
                <NavRight />
            </div>
        </>
    );
};

export default Header;

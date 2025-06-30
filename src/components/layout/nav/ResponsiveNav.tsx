import NavDesktop from "./NavDesktop";
import NavMobileBottom from "./NavMovileBottom";
import NavMobileTop from "./NavMovileTop";

const ResponsiveNav = () => {
    return (
        <>
            <div className="nav-mobile">
                <NavMobileBottom />
            </div>
            <div className="nav-desktop">
                <NavDesktop />
            </div>
        </>
    );
};

ResponsiveNav.MobileTop = NavMobileTop;

export default ResponsiveNav;

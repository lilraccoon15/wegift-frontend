import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useMyProfile } from "../../../features/profile/MyProfile/MyProfileHelpers";

const NavMobileTop = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading || !isAuthenticated) return null;

    const { data: user, isLoading: profileLoading } = useMyProfile();

    if (profileLoading) return null;

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_USER;

    return (
        <nav className="nav-mobile-top">
            {isAuthenticated && user && (
                <>
                    <Link to="/account">
                        <img
                            src={
                                user.picture?.startsWith("http")
                                    ? user.picture
                                    : `${BACKEND_URL}${user.picture}`
                            }
                            alt={`${user.pseudo} profile picture`}
                            className="profile-picture"
                        />
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavMobileTop;

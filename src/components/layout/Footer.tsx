import { useAuth } from "../../context/AuthContext";

const Footer = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading || isAuthenticated === null) {
        return null;
    }

    return (
        <footer className={isAuthenticated ? "auth" : "no-auth"}>
            © {new Date().getFullYear()} WeGift. Tous droits réservés.
        </footer>
    );
};

export default Footer;

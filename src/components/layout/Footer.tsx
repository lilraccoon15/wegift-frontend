import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className={isAuthenticated ? "no-auth" : ""}>
      © {new Date().getFullYear()} WeGift. Tous droits réservés.
      <a href="http://www.freepik.com">
        Illustrations designed by pch.vector / Freepik
      </a>
      <Link to="/conditions-utilisation">
        Conditions générales d'utilisation
      </Link>
      <Link to="/confidentialite">Politique de Confidentialité</Link>
    </footer>
  );
};

export default Footer;

import { useAuth } from "../../context/AuthContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();

  // if (loading || isAuthenticated === null) {
  //     return null;
  // }

  return (
    <footer className={isAuthenticated ? "no-auth" : ""}>
      © {new Date().getFullYear()} WeGift. Tous droits réservés.
      <a href="http://www.freepik.com">
        Illustratins designed by pch.vector / Freepik
      </a>
    </footer>
  );
};

export default Footer;

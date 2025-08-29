import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useCookieBanner } from "../../hooks/useCookieBanner";
import ConfirmModal from "../ui/ConfirmModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isVisible, handleClose } = useCookieBanner();

  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />

      {isVisible && (
        <ConfirmModal
          onClose={handleClose}
          onConfirm={handleClose}
          title="Cookies techniques"
          message="WeGift utilise des cookies strictement nécessaires au bon fonctionnement du site, par exemple pour l'authentification. Aucun cookie de suivi ou publicitaire n'est utilisé."
          confirmLabel="J’ai compris"
        />
      )}
    </>
  );
};

export default Layout;

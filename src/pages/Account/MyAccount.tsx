import { useMyAccount } from "../../features/account/MyAccountHelpers";
import { useState } from "react";
import Enable2FA from "./Enable2FA";
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";
import Preferences from "./Preferences";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";
import DataState from "../../components/ui/DataState";

const MyAccount = () => {
    const { data: _account, error, isLoading: loading } = useMyAccount();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [currentView, setCurrentView] = useState<
        "default" | "editEmail" | "editPassword" | "enable2fa" | "preferences"
    >("default");

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <DataState loading={loading} error={error}>
            <div className="account">
                <div className="title-return">
                    <BackButton />
                    <h1>Paramètres du compte</h1>
                </div>

                {currentView === "default" && (
                    <ul>
                        <Link to="/account/edit-email">
                            <li>
                                <span>
                                    <i className="fa-solid fa-at"></i> Modifier
                                    mon adresse email
                                </span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                        </Link>
                        <Link to="/account/edit-password">
                            <li>
                                <span>
                                    <i className="fa-solid fa-lock"></i>{" "}
                                    Modifier mon mot de passe
                                </span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                        </Link>
                        <Link to="/account/2FA">
                            <li>
                                <span>
                                    <i className="fa-solid fa-key"></i> Double
                                    authentification
                                </span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                        </Link>
                        <Link to="/account/google-link">
                            <li>
                                <span>
                                    <i className="fa-solid fa-link"></i>{" "}
                                    Connexion avec Google
                                </span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                        </Link>
                        <Link to="/account/preferences">
                            <li>
                                <span>
                                    <i className="fa-solid fa-gears"></i>{" "}
                                    Préférences
                                </span>
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                        </Link>
                        <li onClick={handleLogout} className="logout">
                            <span>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                                Déconnexion
                            </span>
                        </li>
                    </ul>
                )}

                {currentView === "editEmail" && (
                    <>
                        <EditEmail />
                        <p onClick={() => setCurrentView("default")}>Retour</p>
                    </>
                )}

                {currentView === "editPassword" && (
                    <>
                        <EditPassword />
                        <p onClick={() => setCurrentView("default")}>Retour</p>
                    </>
                )}

                {currentView === "enable2fa" && (
                    <>
                        <Enable2FA />
                        <p onClick={() => setCurrentView("default")}>Retour</p>
                    </>
                )}

                {currentView === "preferences" && (
                    <>
                        <p>Affichage des préférences ici</p>
                        <Preferences />
                        <p onClick={() => setCurrentView("default")}>Retour</p>
                    </>
                )}
            </div>
        </DataState>
    );
};

export default MyAccount;

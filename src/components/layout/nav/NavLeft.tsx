import { Link } from "react-router-dom";
import { CLIENT_ENV } from "../../../config/clientEnv";

const NavLeft = () => {
    const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_AUTH;

    const PICTURE = "/img/logo.png";

    return (
        <Link to="/">
            <img
                className="logo"
                src={`${BACKEND_URL}${PICTURE}`}
                alt="logo wegift"
            />
        </Link>
    );
};

export default NavLeft;

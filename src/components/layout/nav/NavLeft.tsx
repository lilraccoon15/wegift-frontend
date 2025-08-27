import { Link } from "react-router-dom";
import { BACKEND_URLS } from "../../../config/constants";

const NavLeft = () => {
  const PICTURE = "/img/logo.png";

  return (
    <Link to="/">
      <img
        className="logo"
        src={`${BACKEND_URLS.auth}${PICTURE}`}
        alt="logo wegift"
      />
    </Link>
  );
};

export default NavLeft;

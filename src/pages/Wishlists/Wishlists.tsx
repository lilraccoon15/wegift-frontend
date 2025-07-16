import { Link } from "react-router-dom";
import { useManageWishlists } from "../../features/wishlists/UserWishlists/useManageUserWishlists";
import DataState from "../../components/ui/DataState";

const Wishlists = () => {
    const { wishlists, error, loading } = useManageWishlists();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    return (
        <DataState loading={loading} error={error}>
            <ul className="card-list">
                {wishlists && wishlists?.length == 0 && (
                    <p>Cet utilisateur n'a pas encore de wishlist</p>
                )}
                {wishlists && wishlists?.length > 0 && (
                    <>
                        {wishlists.map((w) => (
                            <Link to={`/wishlist/${w.id}`} className="card">
                                <li key={w.id}>
                                    <div
                                        className="card-picture"
                                        style={{
                                            backgroundImage: `url('${
                                                w.picture?.startsWith("http")
                                                    ? w.picture
                                                    : w.picture
                                                    ? `${BACKEND_URL}${w.picture}`
                                                    : "/default-wishlist-picture.jpg"
                                            }')`,
                                        }}
                                    ></div>

                                    <div className="card-infos">
                                        <h2>{w.title}</h2>
                                        <span>
                                            {w.wishesCount} souhait
                                            {(w.wishesCount ?? 0) > 1
                                                ? "s"
                                                : ""}
                                        </span>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </>
                )}
            </ul>
        </DataState>
    );
};

export default Wishlists;

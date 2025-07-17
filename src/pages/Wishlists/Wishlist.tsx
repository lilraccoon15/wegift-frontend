import { Link } from "react-router-dom";
import { useManageWishlist } from "../../features/wishlists/UserWishlists/useManageWishlist";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";

const Wishlist = () => {
    const {
        wishlist,
        wishes,
        id,
        isLoading,
        error,
        isSubscribed,
        subscribe,
        unsubscribe,
        subscribing,
        unsubscribing,
    } = useManageWishlist();

    if (!id) return <p>Paramètre ID manquant</p>;

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    return (
        <DataState loading={isLoading} error={error}>
            <div className="title-return">
                <BackButton />
                {wishlist?.title && <h1>{wishlist.title}</h1>}
            </div>
            {!wishlist ? (
                <p>Wishlist non trouvée</p>
            ) : (
                <>
                    {isSubscribed !== undefined && (
                        <div className="btn-align-right">
                            <button
                                className={`btn-action ${
                                    isSubscribed ? "subscribed" : ""
                                }`}
                                onClick={() =>
                                    isSubscribed ? unsubscribe() : subscribe()
                                }
                                disabled={subscribing || unsubscribing}
                            >
                                {subscribing || unsubscribing
                                    ? "Chargement..."
                                    : isSubscribed
                                    ? "Abonné"
                                    : "S'abonner"}
                            </button>
                        </div>
                    )}
                    {wishes?.length === 0 && (
                        <p>Il n'y a pas encore de souhait dans cette liste.</p>
                    )}
                    {wishes && wishes?.length > 0 && (
                        <ul className="card-list">
                            {wishes?.map((wish) => (
                                <Link
                                    to={`/wish/${wish.id}`}
                                    className="card"
                                    key={wish.id}
                                >
                                    <div
                                        className="card-picture"
                                        style={{
                                            backgroundImage: `url('${
                                                wish.picture?.startsWith("http")
                                                    ? wish.picture
                                                    : wish.picture
                                                    ? `${BACKEND_URL}${wish.picture}`
                                                    : "/default-wish-picture.jpg"
                                            }')`,
                                        }}
                                    ></div>
                                    <div className="card-infos">
                                        <h2>{wish.title}</h2>
                                    </div>
                                    <li key={wish.id}></li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </DataState>
    );
};

export default Wishlist;

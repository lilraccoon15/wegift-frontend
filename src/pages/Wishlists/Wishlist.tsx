import { Link } from "react-router-dom";
import { useManageWishlist } from "../../features/wishlists/UserWishlists/useManageWishlist";
import DataState from "../../components/ui/DataState";

const Wishlist = () => {
    const { wishlist, wishes, id, isLoading, error } = useManageWishlist();

    if (!id) return <p>Paramètre ID manquant</p>;

    return (
        <DataState loading={isLoading} error={error}>
            {!wishlist ? (
                <p>Wishlist non trouvée</p>
            ) : (
                <>
                    {" "}
                    <h1>{wishlist.title}</h1>
                    {wishes?.length === 0 && (
                        <p>Il n'y a pas encore de souhait dans cette liste.</p>
                    )}
                    {wishes && wishes?.length > 0 && (
                        <ul>
                            {wishes?.map((wish) => (
                                <li key={wish.id}>
                                    <Link to={`/wish/${wish.id}`}>
                                        {wish.title}
                                    </Link>{" "}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </DataState>
    );
};

export default Wishlist;

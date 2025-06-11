import { useParams } from "react-router-dom";
import { useWishesByWishlistId } from "../../features/wishlists/MyWishes/MyWishesHelpers";
import { useMyWishlistById } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";

const MyWishlist = () => {

    const { id } = useParams<{ id: string }>();

    if (!id) return <p>Paramètre ID manquant</p>;

    const { data: wishlist, isLoading: loadingWishlist } = useMyWishlistById(id);
    const { data: wishes, isLoading: loadingWishes } = useWishesByWishlistId(id);
    
    if (loadingWishlist || loadingWishes) return <p>Chargement...</p>;
    if (!wishlist) return <p>Wishlist non trouvée</p>;
    if (!wishes) return <p>Vous n'avez pas encore de souhait dans cette liste.</p>;
    
    return (
      <>
        <h1>{wishlist.title}</h1>
        <ul>
          {wishes?.map(wish => (
            <li key={wish.id}>{wish.title}</li>
          ))}
        </ul>
      </>
    );
}

export default MyWishlist;
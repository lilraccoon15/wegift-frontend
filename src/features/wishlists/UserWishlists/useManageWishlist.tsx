import { useParams } from "react-router-dom";
import { useWishlistById } from "./UserWishlistsHelpers";
import { useWishesByWishlistId } from "../UserWishes/UserWishesHelpers";

export const useManageWishlist = () => {
    const { id } = useParams();
    const wishlistQuery = useWishlistById(id);
    const wishesQuery = useWishesByWishlistId(id);

    return {
        id,
        wishlist: wishlistQuery.data,
        wishes: wishesQuery.data,
        isLoading: wishlistQuery.isLoading || wishesQuery.isLoading,
        error: wishlistQuery.error || wishesQuery.error,
    };
};

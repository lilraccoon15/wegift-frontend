import { useParams } from "react-router-dom";
import { useProfile } from "../../profile/ViewProfile/ViewProfileHelpers";
import { useWishlists } from "./UserWishlistsHelpers";

export const useManageWishlists = () => {
    const { id } = useParams();
    const {
        data: user,
        error: errorUser,
        isLoading: loadingUser,
    } = useProfile(id!);

    const {
        data: wishlists,
        error: errorWishlists,
        isLoading: loadingWishlists,
    } = useWishlists(user?.id);

    return {
        user,
        wishlists,
        loading: loadingUser || loadingWishlists,
        error: errorUser || errorWishlists,
    };
};

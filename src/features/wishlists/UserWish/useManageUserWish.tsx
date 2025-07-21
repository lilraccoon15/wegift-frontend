import { useParams } from "react-router-dom";
import { useWishById } from "../UserWishes/UserWishesHelpers";

export const useManageWish = () => {
    const { id } = useParams<{ id: string }>();

    const { data: wish, isLoading: loading, error } = useWishById(id ?? "");

    return {
        id,
        wish,
        loading,
        error,
    };
};

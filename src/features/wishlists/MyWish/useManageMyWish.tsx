import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMyWishById } from "../MyWishes/MyWishesHelpers";

export const useManageMyWish = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const { data: wish, isLoading: loadingWish } = useMyWishById(id ?? "");


    return {
        id,
        wish,
        loadingWish,
    };
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface Wish {
    id: string;
    title: string;
    wishlistId: string;
    description?: string;
    picture?: string;
    price?: number;
    link?: string;
}

export function useWishesByWishlistId(wishlistId?: string) {
    return useQuery<Wish[], Error>({
        queryKey: ["wishes", wishlistId],
        queryFn: async () => {
            const res = await axios.get(
                `${API_URL}/api/wishlist/wishes?wishlistId=${wishlistId}`,
                {
                    withCredentials: true,
                }
            );
            return res.data.data.wishes ?? [];
        },
        enabled: !!wishlistId,
    });
}

export function useWishById(id?: string) {
    return useQuery<Wish | null, Error>({
        queryKey: ["wish", id],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/api/wishlist/wish/${id}`, {
                withCredentials: true,
            });
            return res.data.data.wish ?? null;
        },
        enabled: !!id,
    });
}

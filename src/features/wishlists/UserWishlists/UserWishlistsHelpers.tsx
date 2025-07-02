import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface Wishlist {
    id: string;
    title: string;
    picture: string;
    description: string;
    access: number;
    userId: string;
    wishesCount?: number;
}

export function useWishlistById(wishlistId: string) {
    return useQuery<Wishlist | null, Error>({
        queryKey: ["wishlist", wishlistId],
        queryFn: async () => {
            const res = await axios.get(
                `${API_URL}/api/wishlist/${wishlistId}`,
                {
                    withCredentials: true,
                }
            );
            return res.data.data.wishlist ?? null;
        },
        enabled: !!wishlistId,
    });
}

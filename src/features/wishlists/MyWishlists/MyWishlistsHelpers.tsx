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

export function useMyWishlists() {
    return useQuery<Wishlist[], Error>({
        queryKey: ["myWishlists"],
        queryFn: async () => {
            const res = await axios.get(
                `${API_URL}/api/wishlist/my-wishlists`,
                {
                    withCredentials: true,
                }
            );
            return res.data?.data?.wishlists ?? [];
        },
    });
}

export function useMyWishlistById(id: string) {
    return useQuery({
        queryKey: ["wishlist", id],
        queryFn: async () => {
            const res = await axios.get(
                `${API_URL}/api/wishlist/my-wishlist/${id}`,
                {
                    withCredentials: true,
                }
            );
            return res.data;
        },
        enabled: !!id,
    });
}

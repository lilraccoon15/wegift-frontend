import axios from "axios";
import API_URL from "../../config";

export type SearchResult =
    | { type: "wishlist"; id: string; title: string }
    | { type: "user"; id: string; pseudo: string }
    | { type: "exchange"; id: string; title: string };

export const searchByType = async (
    query: string,
    type: "all" | "user" | "wishlist" | "exchange"
): Promise<SearchResult[]> => {
    const results: SearchResult[] = [];

    const requests: {
        [key: string]: Promise<any>;
    } = {
        wishlist: axios.get(`${API_URL}/api/wishlist/search?query=${query}`, {
            withCredentials: true,
        }),
        user: axios.get(`${API_URL}/api/users/search?query=${query}`, {
            withCredentials: true,
        }),
        exchange: axios.get(`${API_URL}/api/exchange/search?query=${query}`, {
            withCredentials: true,
        }),
    };

    const keys = type === "all" ? ["wishlist", "user", "exchange"] : [type];

    const responses = await Promise.allSettled(keys.map((k) => requests[k]));

    responses.forEach((res, index) => {
        const resType = keys[index];
        if (res.status === "fulfilled") {
            const data = res.value.data?.data;
            if (resType === "wishlist" && Array.isArray(data?.wishlists)) {
                results.push(
                    ...data.wishlists.map((w: any) => ({
                        type: "wishlist",
                        ...w,
                    }))
                );
            }
            if (resType === "user" && Array.isArray(data?.users)) {
                results.push(
                    ...data.users.map((u: any) => ({
                        type: "user",
                        ...u,
                    }))
                );
            }
            if (resType === "exchange" && Array.isArray(data?.exchanges)) {
                results.push(
                    ...data.exchanges.map((e: any) => ({
                        type: "exchange",
                        ...e,
                    }))
                );
            }
        }
    });

    return results;
};

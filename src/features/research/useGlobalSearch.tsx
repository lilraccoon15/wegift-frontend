import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";

export const useGlobalSearch = (query: string) => {
    type SearchResult =
        | { type: "wishlist"; id: string; title: string }
        | { type: "user"; id: string; pseudo: string }
        | { type: "exchange"; id: string; title: string };

    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [wishlistsRes, usersRes, exchangesRes] =
                    await Promise.all([
                        axios.get(
                            `${API_URL.WISHLIST_SERVICE}/api/wishlist/search?query=${query}`,
                            { withCredentials: true }
                        ),
                        axios.get(
                            `${API_URL.USER_SERVICE}/api/user/search?query=${query}`,
                            { withCredentials: true }
                        ),
                        axios.get(
                            `${API_URL.EXCHANGE_SERVICE}/api/exchange/search?query=${query}`,
                            { withCredentials: true }
                        ),
                    ]);

                setResults([
                    ...wishlistsRes.data.data.wishlists.map((w: any) => ({
                        type: "wishlist",
                        ...w,
                    })),
                    ...usersRes.data.data.users.map((u: any) => ({
                        type: "user",
                        ...u,
                    })),
                    ...exchangesRes.data.data.exchanges.map((e: any) => ({
                        type: "exchange",
                        ...e,
                    })),
                ]);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        const timeout = setTimeout(fetchData, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    return { results, isLoading, error };
};

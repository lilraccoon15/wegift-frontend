import { useState, useEffect } from "react";
import { searchByType } from "./SearchHelpers";
import type { SearchResult } from "./SearchHelpers";

export const useManageSearch = (
    query: string,
    type: "all" | "user" | "wishlist" | "exchange"
) => {
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
                const data = await searchByType(query, type);
                setResults(data);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        const timeout = setTimeout(fetchData, 300);
        return () => clearTimeout(timeout);
    }, [query, type]);

    return { results, isLoading, error };
};

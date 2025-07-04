import { useState } from "react";
import { useManageSearch } from "../../features/research/useManageSearch";
import SearchBar from "../../features/research/SearchBar";
import SearchResults from "../../features/research/SearchResults";

const Research = () => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState<"all" | "user" | "wishlist" | "exchange">(
        "all"
    );
    const { results, isLoading, error } = useManageSearch(query, type);

    return (
        <div>
            <h1>Rechercher</h1>
            <SearchBar
                query={query}
                setQuery={setQuery}
                type={type}
                setType={setType}
            />
            <SearchResults
                results={results}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
};

export default Research;

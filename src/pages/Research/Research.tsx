import { useState } from "react";
import { useManageSearch } from "../../features/research/useManageSearch";
import SearchBar from "../../features/research/SearchBar";
import SearchResults from "../../features/research/SearchResults";
import BackButton from "../../components/ui/BackButton";

const Research = () => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState<"all" | "user" | "wishlist" | "exchange">(
        "all"
    );
    const { results, isLoading, error } = useManageSearch(query, type);

    return (
        <div className="search">
            <div className="title-return">
                <BackButton />
                <h1>Rechercher</h1>
            </div>

            <div className="frame">
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
                    query={query}
                />
            </div>
        </div>
    );
};

export default Research;

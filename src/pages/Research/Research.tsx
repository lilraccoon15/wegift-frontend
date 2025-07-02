import { useState } from "react";
import { useGlobalSearch } from "../../features/research/useGlobalSearch";
import SearchBar from "../../features/research/SearchBar";
import SearchResults from "../../features/research/SearchResults";

const Research = () => {
    const [query, setQuery] = useState("");
    const { results, isLoading, error } = useGlobalSearch(query);

    return (
        <div>
            <h1>Rechercher</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <SearchResults
                results={results}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
};

export default Research;

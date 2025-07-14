import { Link } from "react-router-dom";
import type { SearchResult } from "./SearchHelpers";
import DataState from "../../components/ui/DataState";

interface Props {
    results: SearchResult[];
    isLoading: boolean;
    error: Error | null;
}

const SearchResults = ({ results, isLoading, error }: Props) => {
    return (
        <DataState loading={isLoading} error={error}>
            {results.length === 0 ? (
                <p>Aucun résultat</p>
            ) : (
                <ul className="search-results">
                    {results.map((item) => (
                        <li key={item.id}>
                            {item.type === "wishlist" && (
                                <Link to={`/wishlists/${item.id}`}>
                                    🔖 {item.title}
                                </Link>
                            )}
                            {item.type === "user" && (
                                <Link to={`/profile/${item.id}`}>
                                    👤 {item.pseudo}
                                </Link>
                            )}
                            {item.type === "exchange" && (
                                <Link to={`/exchange/${item.id}`}>
                                    🔁 {item.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </DataState>
    );
};

export default SearchResults;

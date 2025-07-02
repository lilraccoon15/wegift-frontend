import { Link } from "react-router-dom";

interface Props {
    results: any[];
    isLoading: boolean;
    error: Error | null;
}

const SearchResults = ({ results, isLoading, error }: Props) => {
    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (results.length === 0) return <p>Aucun résultat</p>;

    return (
        <ul className="search-results">
            {results.map((item) => (
                <li key={item.id}>
                    {item.type === "wishlist" && (
                        <Link to={`/wishlists/${item.id}`}>
                            🔖 {item.title}
                        </Link>
                    )}
                    {item.type === "user" && (
                        <Link to={`/user/${item.id}`}>
                            👤 {item.pseudo || item.firstName}
                        </Link>
                    )}
                    {item.type === "exchange" && (
                        <Link to={`/exchange/${item.id}`}>🔁 {item.title}</Link>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;

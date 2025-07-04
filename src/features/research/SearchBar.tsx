interface Props {
    query: string;
    setQuery: (value: string) => void;
    type: "all" | "user" | "wishlist" | "exchange";
    setType: (value: "all" | "user" | "wishlist" | "exchange") => void;
}

const SearchBar = ({ query, setQuery, type, setType }: Props) => {
    return (
        <>
            <input
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="border p-2 rounded"
            >
                <option value="all">Tous</option>
                <option value="user">Utilisateurs</option>
                <option value="wishlist">Listes</option>
                <option value="exchange">Échanges</option>
            </select>
        </>
    );
};

export default SearchBar;

interface Props {
    query: string;
    setQuery: (value: string) => void;
}

const SearchBar = ({ query, setQuery }: Props) => {
    return (
        <input
            type="text"
            placeholder="Rechercher..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
        />
    );
};

export default SearchBar;

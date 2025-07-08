interface Props {
  query: string;
  setQuery: (value: string) => void;
  type: "all" | "user" | "wishlist" | "exchange";
  setType: (value: "all" | "user" | "wishlist" | "exchange") => void;
}

const SearchBar = ({ query, setQuery, type, setType }: Props) => {
  return (
    <>
      <label>Rechercher :</label>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={type}
          className="input-info"
          onChange={(e) =>
            setType(e.target.value as "all" | "user" | "wishlist" | "exchange")
          }
        >
          <option value="all">Tous</option>
          <option value="user">Utilisateurs</option>
          <option value="wishlist">Listes</option>
          <option value="exchange">Échanges</option>
        </select>
      </div>
    </>
  );
};

export default SearchBar;

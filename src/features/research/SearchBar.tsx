interface Props {
  query: string;
  setQuery: (value: string) => void;
  type: "all" | "user" | "wishlist" | "exchange";
  setType: (value: "all" | "user" | "wishlist" | "exchange") => void;
  onInputActivity?: () => void;
}

const SearchBar = ({
  query,
  setQuery,
  type,
  setType,
  onInputActivity,
}: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuery(e.target.value);
    if (onInputActivity) onInputActivity(); // déclenche le focus visuel
  };

  return (
    <>
      <label htmlFor="search">Rechercher :</label>
      <div className="search-bar-container" tabIndex={0}>
        <i className="fa-solid fa-magnifying-glass glass-desktop"></i>{" "}
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={handleChange}
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
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </>
  );
};

export default SearchBar;

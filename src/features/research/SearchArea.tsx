import SearchBar from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import { useManageSearch } from "./useManageSearch";

const SearchArea = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | "user" | "wishlist" | "exchange">(
    "all"
  );

  const { results, isLoading, error } = useManageSearch(query, type);
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="searchbar-desktop" ref={wrapperRef}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
          onInputActivity={() => setIsActive(true)}
        />
        <div
          className={`search-result-desktop ${
            isActive && query ? "search-active" : ""
          }`}
        >
          <SearchResults
            results={results}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};
export default SearchArea;

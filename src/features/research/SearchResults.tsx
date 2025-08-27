import { Link } from "react-router-dom";
import type { SearchResult } from "./SearchHelpers";
import DataState from "../../components/ui/DataState";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

interface Props {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  query: string;
}

const SearchResults = ({ results, isLoading, error, query }: Props) => {
  const wishlists = results.filter((item) => item.type === "wishlist");
  const users = results.filter((item) => item.type === "user");
  const exchanges = results.filter((item) => item.type === "exchange");

  return (
    <DataState loading={isLoading} error={error}>
      {results.length === 0 && query && query.trim() !== "" ? (
        <p>Aucun résultat</p>
      ) : (
        <div className="search-results-grouped">
          {/* Utilisateurs en premier */}
          {users.length > 0 && (
            <>
              <h2>Utilisateurs</h2>
              <ul className="search-results">
                {users.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/profile/${item.id}`}
                      className="link-search-result"
                    >
                      <div
                        className="profile-picture"
                        style={{
                          backgroundImage: `url('${
                            item.picture?.startsWith("blob:")
                              ? item.picture
                              : item.picture?.startsWith("http")
                              ? item.picture
                              : `${BACKEND_URLS.user}${
                                  item.picture ?? DEFAULT_PICTURES.user
                                }`
                          }')`,
                        }}
                      />
                      {item.pseudo}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Listes ensuite */}
          {wishlists.length > 0 && (
            <>
              <h2>Listes</h2>
              <ul className="search-results">
                {wishlists.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/wishlist/${item.id}`}
                      className="link-search-result"
                    >
                      <div
                        className="card-picture"
                        style={{
                          backgroundImage: `url('${
                            item.picture?.startsWith("blob:")
                              ? item.picture
                              : item.picture?.startsWith("http")
                              ? item.picture
                              : `${BACKEND_URLS.wishlist}${
                                  item.picture ?? DEFAULT_PICTURES.wishlist
                                }`
                          }')`,
                        }}
                      />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Échanges en dernier */}
          {exchanges.length > 0 && (
            <>
              <h2>Échanges</h2>
              <ul className="search-results">
                {exchanges.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/exchange/${item.id}`}
                      className="link-search-result"
                    >
                      <div
                        className="card-picture"
                        style={{
                          backgroundImage: `url('${
                            item.picture?.startsWith("blob:")
                              ? item.picture
                              : item.picture?.startsWith("http")
                              ? item.picture
                              : `${BACKEND_URLS.exchange}${
                                  item.picture ?? DEFAULT_PICTURES.exchange
                                }`
                          }')`,
                        }}
                      />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </DataState>
  );
};

export default SearchResults;

import { Link } from "react-router-dom";
import type { SearchResult } from "./SearchHelpers";
import DataState from "../../components/ui/DataState";
import { CLIENT_ENV } from "../../config/clientEnv";

interface Props {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  query: string;
}

const DEFAULT_PICTURE_URL_USER = "/uploads/profilePictures/default-profile.jpg";
const BACKEND_URL_USER = CLIENT_ENV.VITE_BACKEND_URL_USER;

const DEFAULT_PICTURE_URL_WISHLIST =
  "/uploads/wishlistPictures/default-wishlist.png";
const BACKEND_URL_WISHLIST = CLIENT_ENV.VITE_BACKEND_URL_WISHLIST;

const DEFAULT_PICTURE_URL_EXCHANGE =
  "/uploads/exchangePictures/default-exchange.png";
const BACKEND_URL_EXCHANGE = CLIENT_ENV.VITE_BACKEND_URL_EXCHANGE;

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
                              : `${BACKEND_URL_USER}${
                                  item.picture ?? DEFAULT_PICTURE_URL_USER
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
                              : `${BACKEND_URL_WISHLIST}${
                                  item.picture ?? DEFAULT_PICTURE_URL_WISHLIST
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
                              : `${BACKEND_URL_EXCHANGE}${
                                  item.picture ?? DEFAULT_PICTURE_URL_EXCHANGE
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

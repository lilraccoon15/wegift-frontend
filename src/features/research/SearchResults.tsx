import { Link } from "react-router-dom";
import type { SearchResult } from "./SearchHelpers";
import DataState from "../../components/ui/DataState";

interface Props {
    results: SearchResult[];
    isLoading: boolean;
    error: Error | null;
}

const DEFAULT_PICTURE_URL_USER = "/uploads/profilePictures/default-profile.jpg";

const BACKEND_URL_USER = import.meta.env.VITE_BACKEND_URL_USER;

const DEFAULT_PICTURE_URL_WISHLIST =
    "/uploads/wishlistPictures/default-wishlist.jpg";

const BACKEND_URL_WISHLIST = import.meta.env.VITE_BACKEND_URL_WISHLIST;

const DEFAULT_PICTURE_URL_EXCHANGE =
    "/uploads/exchangePictures/default-wishlist.jpg";

const BACKEND_URL_EXCHANGE = import.meta.env.VITE_BACKEND_URL_EXCHANGE;

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
                                    <img
                                        src={
                                            item.picture
                                                ? item.picture.startsWith(
                                                      "blob:"
                                                  )
                                                    ? item.picture
                                                    : item.picture.startsWith(
                                                          "http"
                                                      )
                                                    ? item.picture
                                                    : `${BACKEND_URL_WISHLIST}${item.picture}`
                                                : `${BACKEND_URL_WISHLIST}${DEFAULT_PICTURE_URL_WISHLIST}`
                                        }
                                        alt="Photo de profil"
                                        className="wishlist-picture"
                                    />{" "}
                                    {item.title}
                                </Link>
                            )}
                            {item.type === "user" && (
                                <Link to={`/profile/${item.id}`}>
                                    <img
                                        src={
                                            item.picture
                                                ? item.picture.startsWith(
                                                      "blob:"
                                                  )
                                                    ? item.picture
                                                    : item.picture.startsWith(
                                                          "http"
                                                      )
                                                    ? item.picture
                                                    : `${BACKEND_URL_USER}${item.picture}`
                                                : `${BACKEND_URL_USER}${DEFAULT_PICTURE_URL_USER}`
                                        }
                                        alt="Photo de profil"
                                        className="profile-picture"
                                    />{" "}
                                    {item.pseudo}
                                </Link>
                            )}
                            {item.type === "exchange" && (
                                <Link to={`/exchange/${item.id}`}>
                                    <img
                                        src={
                                            item.picture
                                                ? item.picture.startsWith(
                                                      "blob:"
                                                  )
                                                    ? item.picture
                                                    : item.picture.startsWith(
                                                          "http"
                                                      )
                                                    ? item.picture
                                                    : `${BACKEND_URL_EXCHANGE}${item.picture}`
                                                : `${BACKEND_URL_EXCHANGE}${DEFAULT_PICTURE_URL_EXCHANGE}`
                                        }
                                        alt="Photo de profil"
                                        className="exchange-picture"
                                    />{" "}
                                    {item.title}
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

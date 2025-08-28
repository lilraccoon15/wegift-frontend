import { BACKEND_URLS } from "../../../config/constants";
import { useAuth } from "../../../context/AuthContext";
import { useMyWishesReserved } from "./MyWishesResaHelpers";

export const useManageMyWishesResa = () => {
  const { user: currentUser } = useAuth();
  const { data: wishes, isLoading: loading, error } = useMyWishesReserved();

  const BACKEND_URL = BACKEND_URLS.wishlist;
  return { wishes, loading, error, BACKEND_URL, currentUser };
};

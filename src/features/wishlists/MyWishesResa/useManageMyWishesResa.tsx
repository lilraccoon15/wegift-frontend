import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";
import { useMyWishesReserved } from "./MyWishesResaHelpers";

export const useManageMyWishesResa = () => {
  const { data: wishes, isLoading: loading, error } = useMyWishesReserved();
  const { data: currentUser } = useMyProfile();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;
  return { wishes, loading, error, BACKEND_URL, currentUser };
};

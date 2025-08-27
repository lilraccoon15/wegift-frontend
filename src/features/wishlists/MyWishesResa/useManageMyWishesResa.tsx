import { BACKEND_URLS } from "../../../config/constants";
import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";
import { useMyWishesReserved } from "./MyWishesResaHelpers";

export const useManageMyWishesResa = () => {
  const { data: wishes, isLoading: loading, error } = useMyWishesReserved();
  const { data: currentUser } = useMyProfile();

  const BACKEND_URL = BACKEND_URLS.wishlist;
  return { wishes, loading, error, BACKEND_URL, currentUser };
};

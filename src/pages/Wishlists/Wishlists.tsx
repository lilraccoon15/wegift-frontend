import { useManageWishlists } from "../../features/wishlists/UserWishlists/useManageUserWishlists";
import DataState from "../../components/ui/DataState";
import CardList from "../../components/ui/CardList";
import type { Wishlist } from "../../features/wishlists/UserWishlists/UserWishlistsHelpers";
import { CLIENT_ENV } from "../../config/clientEnv";

const Wishlists = () => {
  const { wishlists, error, loading } = useManageWishlists();

  const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_WISHLIST;

  return (
    <DataState loading={loading} error={error}>
      {wishlists && wishlists?.length == 0 && (
        <p>Cet utilisateur n'a pas encore de wishlist</p>
      )}
      {wishlists && wishlists?.length > 0 && (
        <CardList<Wishlist>
          items={wishlists ?? []}
          backendUrl={BACKEND_URL}
          getLink={(item) => `/wishlist/${item.id}`}
          getCountLabel={(item) =>
            `${item.wishesCount ?? 0} souhait${
              item.wishesCount !== 1 ? "s" : ""
            }`
          }
          getDefaultPicture={() =>
            "/uploads/wishlistPictures/default-wishlist.png"
          }
          getPictureUrl={(item) =>
            item.picture?.startsWith("http")
              ? item.picture
              : item.picture
              ? `${BACKEND_URL}${item.picture}`
              : `${BACKEND_URL}/uploads/wishlistPictures/default-wishlist.png`
          }
        />
      )}
    </DataState>
  );
};

export default Wishlists;

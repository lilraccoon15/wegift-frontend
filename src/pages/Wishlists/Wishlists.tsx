import { useManageWishlists } from "../../features/wishlists/UserWishlists/useManageUserWishlists";
import DataState from "../../components/ui/DataState";
import CardList from "../../components/ui/CardList";
import type { Wishlist } from "../../features/wishlists/UserWishlists/UserWishlistsHelpers";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

const Wishlists = () => {
  const { wishlists, error, loading } = useManageWishlists();

  return (
    <DataState loading={loading} error={error}>
      {wishlists && wishlists?.length == 0 && (
        <p>Cet utilisateur n'a pas encore de wishlist</p>
      )}
      {wishlists && wishlists?.length > 0 && (
        <CardList<Wishlist>
          items={wishlists ?? []}
          backendUrl={BACKEND_URLS.wishlist}
          getLink={(item) => `/wishlist/${item.id}`}
          getCountLabel={(item) =>
            `${item.wishesCount ?? 0} souhait${
              item.wishesCount !== 1 ? "s" : ""
            }`
          }
          getDefaultPicture={() => DEFAULT_PICTURES.wishlist}
          getPictureUrl={(item) =>
            item.picture?.startsWith("http")
              ? item.picture
              : item.picture
              ? `${BACKEND_URLS.wishlist}${item.picture}`
              : `${BACKEND_URLS.wishlist}${DEFAULT_PICTURES.wishlist}`
          }
        />
      )}
    </DataState>
  );
};

export default Wishlists;

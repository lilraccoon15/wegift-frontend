import CardList from "../../components/ui/CardList";
import DataState from "../../components/ui/DataState";
import type { Wish } from "../../features/wishlists/MyWishesResa/MyWishesResaHelpers";
import { useManageMyWishesResa } from "../../features/wishlists/MyWishesResa/useManageMyWishesResa";

const MyWishes = () => {
  const { wishes, loading, error, BACKEND_URL, currentUser } =
    useManageMyWishesResa();

  return (
    <DataState loading={loading} error={error}>
      <CardList<Wish>
        items={(wishes ?? [])
          .map((rw) => rw.wish)
          .filter((w): w is Wish => !!w)}
        backendUrl={BACKEND_URL}
        getLink={(item) => `/wish/${item.id}`}
        showEditMenu={(item) => item.userId === currentUser?.id}
        // onEditClick={openWishEditForm}
        // onDeleteClick={confirmWishDelete}
        // optionsItemId={optionsWishId}
        // toggleOptions={toggleOptions}
        getDefaultPicture={() => "/uploads/wishPictures/default-wish.png"}
        getPictureUrl={(item) =>
          item.picture?.startsWith("http")
            ? item.picture
            : item.picture
            ? `${BACKEND_URL}${item.picture}`
            : `${BACKEND_URL}/uploads/wishPictures/default-wish.png`
        }
      />
    </DataState>
  );
};
export default MyWishes;

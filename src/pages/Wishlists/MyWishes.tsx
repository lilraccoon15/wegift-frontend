import CardList from "../../components/ui/CardList";
import DataState from "../../components/ui/DataState";
import type { Wish } from "../../features/wishlists/MyWishesResa/MyWishesResaHelpers";
import { useManageMyWishesResa } from "../../features/wishlists/MyWishesResa/useManageMyWishesResa";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

const MyWishes = () => {
    const { wishes, loading, error, currentUser } = useManageMyWishesResa();

    const filteredWishes: Wish[] = (wishes ?? [])
        .map((rw) => rw.wish)
        .filter((w): w is Wish => !!w);

    // todo : rajouter le prix + filtrage

    return (
        <DataState loading={loading} error={error}>
            {filteredWishes.length === 0 ? (
                <p className="empty-message">
                    Vous n’avez encore réservé aucun souhait.
                </p>
            ) : (
                <CardList<Wish>
                    items={(wishes ?? [])
                        .map((rw) => rw.wish)
                        .filter((w): w is Wish => !!w)}
                    backendUrl={BACKEND_URLS.wishlist}
                    getLink={(item) => `/wish/${item.id}`}
                    showEditMenu={(item) => item.userId === currentUser?.id}
                    // onEditClick={openWishEditForm}
                    // onDeleteClick={confirmWishDelete}
                    // optionsItemId={optionsWishId}
                    // toggleOptions={toggleOptions}
                    getDefaultPicture={() => DEFAULT_PICTURES.wish}
                    getPictureUrl={(item) =>
                        item.picture?.startsWith("http")
                            ? item.picture
                            : item.picture
                            ? `${BACKEND_URLS.wishlist}${item.picture}`
                            : `${BACKEND_URLS.wishlist}${DEFAULT_PICTURES.wish}`
                    }
                />
            )}
        </DataState>
    );
};
export default MyWishes;

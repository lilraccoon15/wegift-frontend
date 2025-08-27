import { useManageWishlist } from "../../features/wishlists/UserWishlists/useManageWishlist";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import CardList from "../../components/ui/CardList";
import type { Wish } from "../../features/wishlists/UserWishes/UserWishesHelpers";
import ActionButtons from "../../components/ui/ActionButtons";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

const Wishlist = () => {
  const {
    wishlist,
    wishes,
    id,
    isLoading,
    error,
    subscribe,
    unsubscribe,
    subscribing,
    unsubscribing,
    subscriptionStatus,
  } = useManageWishlist();

  // TODO :
  // - bouton signaler pour utilisateur
  // - bouton supprimer pour admin

  if (!id) return <p>Paramètre ID manquant</p>;

  return (
    <DataState loading={isLoading} error={error}>
      <div className="title-return">
        <BackButton />
        {wishlist?.title && <h1>{wishlist.title}</h1>}
      </div>
      {!wishlist ? (
        <p>Wishlist non trouvée</p>
      ) : (
        <>
          <div className="btn-align-right">
            <ActionButtons
              status={subscriptionStatus}
              isSubmitting={subscribing || unsubscribing}
              onAdd={subscribe}
              onDecline={unsubscribe}
              variant="custom"
              labels={{
                add: "S'abonner",
                cancel: "Se désabonner",
                accepted: "Abonné",
                rejected: "Erreur",
              }}
            />
          </div>
          {wishes?.length === 0 && (
            <p>Il n'y a pas encore de souhait dans cette liste.</p>
          )}
          <CardList<Wish>
            items={wishes ?? []}
            backendUrl={BACKEND_URLS.wishlist}
            getLink={(item) => `/wish/${item.id}`}
            getDefaultPicture={() => DEFAULT_PICTURES.wish}
            getPictureUrl={(item) =>
              item.picture?.startsWith("http")
                ? item.picture
                : item.picture
                ? `${BACKEND_URLS.wishlist}${item.picture}`
                : `${BACKEND_URLS.wishlist}${DEFAULT_PICTURES.wish}`
            }
          />
        </>
      )}
    </DataState>
  );
};

export default Wishlist;

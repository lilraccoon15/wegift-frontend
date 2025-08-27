import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import { useManageWish } from "../../features/wishlists/UserWish/useManageUserWish";
// import ToggleSwitch from "../../components/forms/ToggleSwitch";
import { useMyProfile } from "../../features/profile/MyProfile/MyProfileHelpers";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

const Wish = () => {
  const {
    id,
    wish,
    loading,
    error,
    handleConfirmReserve,
    handleCancelReservation,
  } = useManageWish();

  // TODO :
  // - bouton signaler pour utilisateur
  // - bouton supprimer pour admin

  const { data: currentUser } = useMyProfile();

  if (!id) return <p>Paramètre ID manquant</p>;

  const isReservedByMe = wish?.reservation?.userId === currentUser?.id;

  return (
    <DataState loading={loading} error={error}>
      {wish && (
        <>
          <div className="title-return">
            <BackButton />
            <h1>{wish.title}</h1>
          </div>

          <img
            className="wish-picture"
            src={
              wish.picture?.startsWith("blob:")
                ? wish.picture
                : wish.picture?.startsWith("http")
                ? wish.picture
                : `${BACKEND_URLS.wishlist}${
                    wish.picture ?? DEFAULT_PICTURES.wish
                  }`
            }
            alt="Wish"
            loading="lazy"
          />

          <h2>{wish.title}</h2>
          <p>{wish.description}</p>
          {wish.price !== null && <p>{wish.price} €</p>}
          {wish.link && (
            <p>
              <a href={wish.link} target="_blank" rel="noopener noreferrer">
                Voir le lien
              </a>
            </p>
          )}

          {wish.status === "available" && (
            <button onClick={() => handleConfirmReserve()}>Réserver</button>
          )}

          {wish.status === "reserved" && isReservedByMe && (
            <button onClick={handleCancelReservation}>
              Annuler la réservation
            </button>
          )}

          {wish.status === "reserved" && !isReservedByMe && (
            <p className="text-gray-500 italic">Déjà réservé</p>
          )}
        </>
      )}
    </DataState>
  );
};

export default Wish;

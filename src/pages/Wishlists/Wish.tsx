import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import { useManageWish } from "../../features/wishlists/UserWish/useManageUserWish";
// import ToggleSwitch from "../../components/forms/ToggleSwitch";
import { useMyProfile } from "../../features/profile/MyProfile/MyProfileHelpers";

const Wish = () => {
  const {
    id,
    wish,
    loading,
    error,
    // showReservationOptions,
    // setShowReservationOptions,
    // isAnonymous,
    // setIsAnonymous,
    handleConfirmReserve,
    handleCancelReservation,
  } = useManageWish();

  const { data: currentUser } = useMyProfile();

  const DEFAULT_PICTURE_URL_WISH = "/uploads/wishPictures/default-wish.png";
  const BACKEND_URL_WISHLIST = import.meta.env.VITE_BACKEND_URL_WISHLIST;

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
                : `${BACKEND_URL_WISHLIST}${
                    wish.picture ?? DEFAULT_PICTURE_URL_WISH
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

          {/* Gestion réservation */}
          {/* {wish.status === "available" && !showReservationOptions && (
            <button onClick={() => setShowReservationOptions(true)}>
              Réserver
            </button>
          )} */}

          {/* {showReservationOptions && wish.status === "available" && (
            <div className="reservation-options mt-4">
              <label className="flex items-center gap-2">
                <ToggleSwitch
                  name="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                Réserver anonymement
              </label>

              <div className="flex gap-2 mt-2">
                <button onClick={() => handleConfirmReserve(isAnonymous)}>
                  Confirmer
                </button>
                <button onClick={() => setShowReservationOptions(false)}>
                  Annuler
                </button>
              </div>
            </div>
          )} */}

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

import { useManageMyWish } from "../../features/wishlists/MyWish/useManageMyWish";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";

const MyWish = () => {
  const { id, wish, loading, error } = useManageMyWish();
  console.log(wish);

  const DEFAULT_PICTURE_URL_WISH = "/uploads/wishlistPictures/default-wish.jpg";
  const BACKEND_URL_WISHLIST = import.meta.env.VITE_BACKEND_URL_WISHLIST;

  if (!id) return <p>Paramètre ID manquant</p>;

  return (
    <DataState loading={loading} error={error}>
      {wish && (
        <>
          <div className="title-return">
            <BackButton />
            {wish?.title && <h1>{wish.title}</h1>}
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
          <p>{wish.price}</p>
          <p>{wish.link}</p>
          {/* todo : afficher le statut, le bouton pour modifier, le bouton pour supprimer lol */}
          {/* todo : rajouter le statut d'un souhait en base + model */}
          {/* todo : griser un souhait si déjà réservé */}
        </>
      )}
    </DataState>
  );
};

export default MyWish;

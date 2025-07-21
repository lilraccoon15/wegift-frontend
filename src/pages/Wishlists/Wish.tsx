import { useManageMyWish } from "../../features/wishlists/MyWish/useManageMyWish";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import EditWishForm from "../../features/wishlists/EditWish/EditWishForm";
import { useManageWish } from "../../features/wishlists/UserWish/useManageUserWish";

const Wish = () => {
    const { id, wish, loading, error } = useManageWish();

    const DEFAULT_PICTURE_URL_WISH = "/uploads/wishPictures/default-wish.png";
    const BACKEND_URL_WISHLIST = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    if (!id) return <p>Paramètre ID manquant</p>;

    return (
        <DataState loading={loading} error={error}>
            {wish && (
                <>
                    <div className="title-return">
                        <BackButton />
                        {wish.title && <h1>{wish.title}</h1>}
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
                    <p>{wish.price} €</p>
                    <p>
                        {wish.link && (
                            <a
                                href={wish.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Voir le lien
                            </a>
                        )}
                    </p>
                </>
            )}
        </DataState>
    );
};

export default Wish;

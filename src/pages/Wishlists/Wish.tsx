import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import { useManageWish } from "../../features/wishlists/UserWish/useManageUserWish";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { useWishlistById } from "../../features/wishlists/UserWishlists/UserWishlistsHelpers";

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

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmType, setConfirmType] = useState<"reserve" | "cancel" | null>(
        null
    );

    const { data: wishlist } = useWishlistById(wish?.wishlistId);

    const { user: currentUser } = useAuth();

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
                            <a
                                href={wish.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Voir le lien
                            </a>
                        </p>
                    )}

                    {currentUser?.id !== wishlist?.userId && (
                        <>
                            {wish.status === "available" && (
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setConfirmType("reserve");
                                        setShowConfirm(true);
                                    }}
                                >
                                    J'offre ce souhait
                                </button>
                            )}

                            {wish.status === "reserved" && isReservedByMe && (
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setConfirmType("cancel");
                                        setShowConfirm(true);
                                    }}
                                >
                                    Annuler la réservation
                                </button>
                            )}
                        </>
                    )}

                    {showConfirm && confirmType === "reserve" && (
                        <ConfirmModal
                            title="Confirmer la réservation"
                            message={`Souhaitez-vous offrir "${wish.title}" ?`}
                            confirmLabel="Oui, offrir"
                            cancelLabel="Annuler"
                            onClose={() => setShowConfirm(false)}
                            onConfirm={() => {
                                handleConfirmReserve();
                                setShowConfirm(false);
                            }}
                        />
                    )}

                    {showConfirm && confirmType === "cancel" && (
                        <ConfirmModal
                            title="Annuler la réservation"
                            message={`Souhaitez-vous annuler la réservation de "${wish.title}" ?`}
                            confirmLabel="Oui, annuler"
                            cancelLabel="Retour"
                            onClose={() => setShowConfirm(false)}
                            onConfirm={() => {
                                handleCancelReservation();
                                setShowConfirm(false);
                            }}
                        />
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

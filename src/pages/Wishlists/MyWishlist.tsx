import { useNavigate } from "react-router-dom";
import { useManageMyWishlist } from "../../features/wishlists/MyWishlist/useManageMyWishlist";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import Modal from "../../components/ui/Modal";
import CreateWishModalContent from "../../components/ui/CreateWishModalContent";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CardList from "../../components/ui/CardList";
import type { Wish } from "../../features/wishlists/MyWishes/MyWishesHelpers";
import EditWishForm from "../../features/wishlists/EditWish/EditWishForm";
import EditWishlistForm from "../../features/wishlists/EditWishlist/EditWishlistForm";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

const MyWishlist = () => {
    const navigate = useNavigate();
    const {
        wishlist,
        creationMode,
        setCreationMode,
        handleCreateSubmit,
        wishTitle,
        setWishTitle,
        handleWishPictureChange,
        wishDescription,
        setWishDescription,
        wishPicturePreview,
        wishPrice,
        setWishPrice,
        wishLink,
        setWishLink,
        wishSubmitError,
        wishIsSubmitting,
        wishes,
        openWishEditForm,
        loading,
        error,
        handleScrappingSubmit,
        url,
        setUrl,
        submitErrorScrapping,
        isSubmittingScrapping,
        currentUser,
        confirmWishDelete,
        optionsWishId,
        toggleOptions,
        showConfirm,
        confirmType,
        wishlistToDelete,
        wishToDelete,
        setShowConfirm,
        setWishlistToDelete,
        setWishToDelete,
        setConfirmType,
        setOptionsWishId,
        openWishEdition,
        wishToEdit,
        closeWishEditForm,
        handleWishEditSubmit,
        openWishlistEditForm,
        openWishlistEdition,
        wishlistToEdit,
        closeWishlistEditForm,
        handleWishlistEditSubmit,
        wishlistTitle,
        setWishlistTitle,
        handleWishlistPictureChange,
        wishlistDescription,
        setWishlistDescription,
        wishlistPicturePreview,
        wishlistAccess,
        setWishlistAccess,
        wishlistPublished,
        setWishlistPublished,
        wishlistSubmitError,
        wishlistIsSubmitting,
        wishlistMode,
        setWishlistMode,
        wishlistParticipants,
        setWishlistParticipants,
        handleWishlistDeleteConfirm,
        handleWishDeleteConfirm,
        status,
        handleStatusChange,
        wishlistSubscribers,
        subscriberToDelete,
        setSubscriberToDelete,
        confirmSubscriberDelete,
        handleSubscriberDeleteConfirm,
        handleLeaveWishlistCollaboration,
    } = useManageMyWishlist(navigate);

    return (
        <DataState loading={loading} error={error}>
            <div className="title-return">
                <BackButton />
                <h1>{wishlist?.title}</h1>
                {currentUser?.id === wishlist?.userId && (
                    <div className="actions">
                        <button
                            onClick={() =>
                                wishlist && openWishlistEditForm(wishlist)
                            }
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                            onClick={() =>
                                wishlist && confirmWishDelete(wishlist)
                            }
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                )}
                {currentUser?.id !== wishlist?.userId && (
                    <button
                        className="btn"
                        onClick={() => {
                            setConfirmType("leave");
                            setShowConfirm(true);
                        }}
                    >
                        Arrêter de collaborer
                    </button>
                )}
            </div>

            {showConfirm && confirmType === "leave" && (
                <ConfirmModal
                    title="Confirmer le retrait de la liste"
                    message="Êtes-vous sûr(e) de vouloir vous retirer de la liste ?"
                    confirmLabel="Oui, me retirer"
                    cancelLabel="Annuler"
                    onClose={() => setShowConfirm(false)}
                    onConfirm={() => {
                        setShowConfirm(false);
                        handleLeaveWishlistCollaboration();
                    }}
                />
            )}

            {wishlistSubscribers.length > 0 && (
                <div>
                    <h2>Abonnés :</h2>
                    <ul>
                        {wishlistSubscribers.map((user) => (
                            <li key={user.id}>
                                {user.picture && (
                                    <img src={user.picture} alt={user.pseudo} />
                                )}
                                {user.pseudo}
                                <button
                                    onClick={() =>
                                        confirmSubscriberDelete(user)
                                    }
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <CardList<Wish>
                items={wishes ?? []}
                backendUrl={BACKEND_URLS.wishlist}
                onAddClick={() => setCreationMode("choice")}
                getLink={(item) => `/my-wish/${item.id}`}
                showEditMenu={() => wishlist?.userId === currentUser?.id}
                onEditClick={openWishEditForm}
                onDeleteClick={confirmWishDelete}
                optionsItemId={optionsWishId}
                toggleOptions={toggleOptions}
                getDefaultPicture={() => DEFAULT_PICTURES.wish}
                getPictureUrl={(item) =>
                    item.picture?.startsWith("http")
                        ? item.picture
                        : item.picture
                        ? `${BACKEND_URLS.wishlist}${item.picture}`
                        : `${BACKEND_URLS.wishlist}${DEFAULT_PICTURES.wish}`
                }
            />

            {showConfirm && confirmType === "wishlist" && wishlistToDelete && (
                <ConfirmModal
                    title="Supprimer cette liste ?"
                    message={`Souhaitez-vous vraiment supprimer la wishlist "${wishlistToDelete.title}" ?`}
                    onClose={() => {
                        setShowConfirm(false);
                        setWishlistToDelete(null);
                        setConfirmType(null);
                        setOptionsWishId(null);
                    }}
                    onConfirm={handleWishlistDeleteConfirm}
                    confirmLabel="Oui"
                    cancelLabel="Non"
                />
            )}

            {showConfirm && confirmType === "wish" && wishToDelete && (
                <ConfirmModal
                    title="Supprimer ce souhait ?"
                    message={`Souhaitez-vous vraiment supprimer la liste "${wishToDelete.title}" ?`}
                    onClose={() => {
                        setShowConfirm(false);
                        setWishToDelete(null);
                        setConfirmType(null);
                        setOptionsWishId(null);
                    }}
                    onConfirm={handleWishDeleteConfirm}
                    confirmLabel="Supprimer"
                    cancelLabel="Annuler"
                />
            )}

            {creationMode !== "none" && (
                <Modal
                    onClose={() => setCreationMode("none")}
                    title="Créer un souhait"
                >
                    <div className="modal-body">
                        <CreateWishModalContent
                            setModeNone={() => setCreationMode("none")}
                            onSubmit={handleCreateSubmit}
                            title={wishTitle}
                            onTitleChange={(e) => setWishTitle(e.target.value)}
                            onPictureChange={handleWishPictureChange}
                            description={wishDescription}
                            onDescriptionChange={(e) =>
                                setWishDescription(e.target.value)
                            }
                            picturePreview={wishPicturePreview}
                            price={wishPrice}
                            onPriceChange={(e) => setWishPrice(e.target.value)}
                            link={wishLink}
                            onLinkChange={(e) => setWishLink(e.target.value)}
                            error={wishSubmitError}
                            buttondisabled={wishIsSubmitting}
                            onSubmitScrapping={handleScrappingSubmit}
                            url={url}
                            onUrlChange={(e) => setUrl(e.target.value)}
                            errorScrapping={submitErrorScrapping}
                            buttondisabledScrapping={isSubmittingScrapping}
                            status={status}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                </Modal>
            )}

            {openWishEdition && wishToEdit && (
                <Modal onClose={closeWishEditForm} title="Éditer mon souhait">
                    <div className="modal-body">
                        <EditWishForm
                            onSubmit={handleWishEditSubmit}
                            title={wishTitle}
                            onTitleChange={(e) => setWishTitle(e.target.value)}
                            onPictureChange={handleWishPictureChange}
                            description={wishDescription}
                            onDescriptionChange={(e) =>
                                setWishDescription(e.target.value)
                            }
                            picturePreview={wishPicturePreview}
                            price={wishPrice}
                            onPriceChange={(e) => setWishPrice(e.target.value)}
                            link={wishLink}
                            onLinkChange={(e) => setWishLink(e.target.value)}
                            error={wishSubmitError}
                            buttondisabled={wishIsSubmitting}
                            status={status}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                </Modal>
            )}

            {openWishlistEdition && wishlistToEdit && (
                <Modal onClose={closeWishlistEditForm} title="Éditer ma liste">
                    <div className="modal-body">
                        <EditWishlistForm
                            onSubmit={handleWishlistEditSubmit}
                            title={wishlistTitle}
                            onTitleChange={(e) =>
                                setWishlistTitle(e.target.value)
                            }
                            onPictureChange={handleWishlistPictureChange}
                            description={wishlistDescription}
                            onDescriptionChange={(e) =>
                                setWishlistDescription(e.target.value)
                            }
                            picturePreview={wishlistPicturePreview}
                            access={wishlistAccess}
                            onAccessChange={(e) =>
                                setWishlistAccess(e.target.value)
                            }
                            published={wishlistPublished}
                            onPublishedChange={(e) =>
                                setWishlistPublished(e.target.value)
                            }
                            error={wishlistSubmitError}
                            buttondisabled={wishlistIsSubmitting}
                            mode={wishlistMode}
                            onModeChange={(e) =>
                                setWishlistMode(e.target.value)
                            }
                            participants={wishlistParticipants}
                            setParticipants={setWishlistParticipants}
                        />
                    </div>
                </Modal>
            )}

            {showConfirm &&
                confirmType === "subscriber" &&
                subscriberToDelete && (
                    <ConfirmModal
                        title="Retirer cet abonné ?"
                        message={`Souhaitez-vous vraiment retirer ${subscriberToDelete.pseudo} de cette wishlist ?`}
                        onClose={() => {
                            setShowConfirm(false);
                            setSubscriberToDelete(null);
                            setConfirmType(null);
                        }}
                        onConfirm={handleSubscriberDeleteConfirm}
                        confirmLabel="Retirer"
                        cancelLabel="Annuler"
                    />
                )}
        </DataState>
    );
};

export default MyWishlist;

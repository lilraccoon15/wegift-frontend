import { Link, useNavigate } from "react-router-dom";
import { useManageMyWishlist } from "../../features/wishlists/MyWishlist/useManageMyWishlist";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import Modal from "../../components/ui/Modal";
import CreateWishModalContent from "../../components/ui/CreateWishModalContent";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CardList from "../../components/ui/CardList";
import type { Wish } from "../../features/wishlists/MyWishes/MyWishesHelpers";

const MyWishlist = () => {
    const navigate = useNavigate();

    const {
        id,
        wishlist,
        creationMode,
        setCreationMode,
        handleCreateSubmit,
        title,
        setTitle,
        handlePictureChange,
        description,
        setDescription,
        picturePreview,
        price,
        setPrice,
        link,
        setLink,
        submitError,
        isSubmitting,
        wishes,
        openEditForm,
        loading,
        error,
        handleScrappingSubmit,
        url,
        setUrl,
        submitErrorScrapping,
        isSubmittingScrapping,
        BACKEND_URL,
        setShowCreate,
        currentUser,
        confirmDelete,
        optionsWishId,
        toggleOptions,
        showConfirm,
        wishToDelete,
        setShowConfirm,
        setWishToDelete,
        setOptionsWishId,
        handleDeleteButton,
    } = useManageMyWishlist(navigate);

    return (
        <DataState loading={loading} error={error}>
            <div className="title-return">
                <BackButton />
                {wishlist?.data?.wishlist?.title && (
                    <h1>{wishlist.data.wishlist.title}</h1>
                )}
            </div>

            <CardList<Wish>
                items={wishes ?? []}
                backendUrl={BACKEND_URL}
                onAddClick={() => setCreationMode("choice")}
                getLink={(item) => `/my-wish/${item.id}`}
                showEditMenu={() =>
                    wishlist?.data?.wishlist?.userId === currentUser?.id
                }
                onEditClick={openEditForm}
                onDeleteClick={confirmDelete}
                optionsItemId={optionsWishId}
                toggleOptions={toggleOptions}
            />

            {showConfirm && wishToDelete && (
                <ConfirmModal
                    title="Supprimer ce souhait ?"
                    message={`Souhaitez-vous vraiment supprimer le souhait "${wishToDelete.title}" ?`}
                    onClose={() => {
                        setShowConfirm(false);
                        setWishToDelete(null);
                        setOptionsWishId(null);
                    }}
                    onConfirm={() => {
                        handleDeleteButton(wishToDelete);
                        setShowConfirm(false);
                        setWishToDelete(null);
                    }}
                    confirmLabel="Supprimer"
                    cancelLabel="Annuler"
                />
            )}

            {creationMode !== "none" && (
                <Modal
                    onClose={() => setCreationMode("none")}
                    title="Créer un souhait"
                >
                    <CreateWishModalContent
                        setModeNone={() => setCreationMode("none")}
                        onSubmit={handleCreateSubmit}
                        title={title}
                        onTitleChange={(e) => setTitle(e.target.value)}
                        onPictureChange={handlePictureChange}
                        description={description}
                        onDescriptionChange={(e) =>
                            setDescription(e.target.value)
                        }
                        picturePreview={picturePreview}
                        price={price}
                        onPriceChange={(e) => setPrice(e.target.value)}
                        link={link}
                        onLinkChange={(e) => setLink(e.target.value)}
                        error={submitError}
                        buttondisabled={isSubmitting}
                        onSubmitScrapping={handleScrappingSubmit}
                        url={url}
                        onUrlChange={(e) => setUrl(e.target.value)}
                        errorScrapping={submitErrorScrapping}
                        buttondisabledScrapping={isSubmittingScrapping}
                    />
                </Modal>
            )}
        </DataState>
    );
};

export default MyWishlist;

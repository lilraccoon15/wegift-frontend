import CreateWishlistForm from "../../features/wishlists/CreateWishlist/CreateWishlistForm";
import { type Wishlist } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import { useNavigate } from "react-router-dom";
import EditWishlistForm from "../../features/wishlists/EditWishlist/EditWishlistForm";
import { useManageMyWishlists } from "../../features/wishlists/MyWishlists/useManageMyWishlists";
import DataState from "../../components/ui/DataState";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CardList from "../../components/ui/CardList";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

const MyWishlists = () => {
    const navigate = useNavigate();

    const {
        title,
        description,
        picturePreview,
        access,
        published,
        isSubmitting,
        submitError,
        showCreate,
        openEdition,
        wishlistToEdit,
        setTitle,
        setDescription,
        setAccess,
        setPublished,
        setShowCreate,
        handlePictureChange,
        handleCreateSubmit,
        handleEditSubmit,
        openEditForm,
        closeEditForm,
        mode,
        setMode,
        participants,
        setParticipants,
        toggleOptions,
        optionsWishlistId,
        confirmDelete,
        showConfirm,
        wishlistToDelete,
        setShowConfirm,
        setWishlistToDelete,
        handleDeleteButton,
        setOptionsWishlistId,
        currentUser,
        wishlists,
        error,
        isLoading,
    } = useManageMyWishlists(navigate);

    return (
        <DataState loading={isLoading} error={error}>
            <CardList<Wishlist>
                items={wishlists ?? []}
                backendUrl={BACKEND_URLS.wishlist}
                onAddClick={() => setShowCreate(true)}
                getLink={(item) => `/my-wishlist/${item.id}`}
                showEditMenu={(item) => item.userId === currentUser?.id}
                onEditClick={openEditForm}
                onDeleteClick={confirmDelete}
                optionsItemId={optionsWishlistId}
                toggleOptions={toggleOptions}
                getCountLabel={(item) =>
                    `${item.wishesCount ?? 0} souhait${
                        item.wishesCount !== 1 ? "s" : ""
                    }`
                }
                extraIcons={(item) => (
                    <>
                        {item.mode === "collaborative" && (
                            <i className="fa-solid fa-user-group"></i>
                        )}
                        {item.published === false && (
                            <i className="fa-solid fa-lock"></i>
                        )}
                    </>
                )}
                getDefaultPicture={() => DEFAULT_PICTURES.wishlist}
                getPictureUrl={(item) =>
                    item.picture?.startsWith("http")
                        ? item.picture
                        : item.picture
                        ? `${BACKEND_URLS.wishlist}${item.picture}`
                        : `${BACKEND_URLS.wishlist}${DEFAULT_PICTURES.wishlist}`
                }
            />

            {showConfirm && wishlistToDelete && (
                <ConfirmModal
                    title="Supprimer cette liste ?"
                    message={`Souhaitez-vous vraiment supprimer la liste "${wishlistToDelete.title}" ?`}
                    onClose={() => {
                        setShowConfirm(false);
                        setWishlistToDelete(null);
                        setOptionsWishlistId(null);
                    }}
                    onConfirm={() => {
                        handleDeleteButton(wishlistToDelete);
                        setShowConfirm(false);
                        setWishlistToDelete(null);
                    }}
                    confirmLabel="Supprimer"
                    cancelLabel="Annuler"
                />
            )}

            {openEdition && wishlistToEdit && (
                <Modal onClose={closeEditForm} title="Editer ma liste">
                    <div className="modal-body">
                        <EditWishlistForm
                            onSubmit={handleEditSubmit}
                            title={title}
                            onTitleChange={(e) => setTitle(e.target.value)}
                            onPictureChange={handlePictureChange}
                            description={description}
                            onDescriptionChange={(e) =>
                                setDescription(e.target.value)
                            }
                            picturePreview={picturePreview}
                            access={access}
                            onAccessChange={(e) => setAccess(e.target.value)}
                            published={published}
                            onPublishedChange={(e) =>
                                setPublished(e.target.value)
                            }
                            error={submitError}
                            buttondisabled={isSubmitting}
                            mode={mode}
                            onModeChange={(e) => setMode(e.target.value)}
                            participants={participants}
                            setParticipants={setParticipants}
                        />
                    </div>
                </Modal>
            )}

            {showCreate && (
                <Modal
                    onClose={() => setShowCreate(false)}
                    title="Créer une liste"
                >
                    <div className="modal-body">
                        <CreateWishlistForm
                            onSubmit={handleCreateSubmit}
                            title={title}
                            onTitleChange={(e) => setTitle(e.target.value)}
                            onPictureChange={handlePictureChange}
                            description={description}
                            onDescriptionChange={(e) =>
                                setDescription(e.target.value)
                            }
                            picturePreview={picturePreview}
                            access={access}
                            onAccessChange={(e) => setAccess(e.target.value)}
                            error={submitError}
                            buttondisabled={isSubmitting}
                            mode={mode}
                            onModeChange={(e) => setMode(e.target.value)}
                            participants={participants}
                            setParticipants={setParticipants}
                        />
                    </div>
                </Modal>
            )}
        </DataState>
    );
};

export default MyWishlists;

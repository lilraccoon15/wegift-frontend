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
    BACKEND_URL,
    currentUser,
    confirmWishDelete,
    optionsWishId,
    toggleOptions,
    showConfirm,
    wishToDelete,
    setShowConfirm,
    setWishToDelete,
    setOptionsWishId,
    handleWishDeleteButton,
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
  } = useManageMyWishlist(navigate);

  return (
    <DataState loading={loading} error={error}>
      <div className="title-return">
        <BackButton />
        {wishlist?.data?.wishlist?.title && (
          <h1>{wishlist.data.wishlist.title}</h1>
        )}
      </div>

      <button onClick={() => openWishlistEditForm(wishlist.data.wishlist)}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <CardList<Wish>
        items={wishes ?? []}
        backendUrl={BACKEND_URL}
        onAddClick={() => setCreationMode("choice")}
        getLink={(item) => `/my-wish/${item.id}`}
        showEditMenu={() =>
          wishlist?.data?.wishlist?.userId === currentUser?.id
        }
        onEditClick={openWishEditForm}
        onDeleteClick={confirmWishDelete}
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
            handleWishDeleteButton(wishToDelete);
            setShowConfirm(false);
            setWishToDelete(null);
          }}
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
        />
      )}

      {creationMode !== "none" && (
        <Modal onClose={() => setCreationMode("none")} title="Créer un souhait">
          <div className="modal-body">
            <CreateWishModalContent
              setModeNone={() => setCreationMode("none")}
              onSubmit={handleCreateSubmit}
              title={wishTitle}
              onTitleChange={(e) => setWishTitle(e.target.value)}
              onPictureChange={handleWishPictureChange}
              description={wishDescription}
              onDescriptionChange={(e) => setWishDescription(e.target.value)}
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
            />
          </div>
        </Modal>
      )}

      {openWishEdition && wishToEdit && (
        <Modal onClose={closeWishEditForm} title="Editer mon souhait">
          <div className="modal-body">
            <EditWishForm
              onSubmit={handleWishEditSubmit}
              title={wishTitle}
              onTitleChange={(e) => setWishTitle(e.target.value)}
              onPictureChange={handleWishPictureChange}
              description={wishDescription}
              onDescriptionChange={(e) => setWishDescription(e.target.value)}
              picturePreview={wishPicturePreview}
              price={wishPrice}
              onPriceChange={(e) => setWishPrice(e.target.value)}
              link={wishLink}
              onLinkChange={(e) => setWishLink(e.target.value)}
              error={wishSubmitError}
              buttondisabled={wishIsSubmitting}
            />
          </div>
        </Modal>
      )}

      {openWishlistEdition && wishlistToEdit && (
        <Modal onClose={closeWishlistEditForm} title="Editer ma liste">
          <div className="modal-body">
            <EditWishlistForm
              onSubmit={handleWishlistEditSubmit}
              title={wishlistTitle}
              onTitleChange={(e) => setWishlistTitle(e.target.value)}
              onPictureChange={handleWishlistPictureChange}
              description={wishlistDescription}
              onDescriptionChange={(e) =>
                setWishlistDescription(e.target.value)
              }
              picturePreview={wishlistPicturePreview}
              access={wishlistAccess}
              onAccessChange={(e) => setWishlistAccess(e.target.value)}
              published={wishlistPublished}
              onPublishedChange={(e) => setWishlistPublished(e.target.value)}
              error={wishlistSubmitError}
              buttondisabled={wishlistIsSubmitting}
              mode={wishlistMode}
              onModeChange={(e) => setWishlistMode(e.target.value)}
              participants={wishlistParticipants}
              setParticipants={setWishlistParticipants}
            />
          </div>
        </Modal>
      )}

      {/* Todo : formulaire de modification du souhait */}
      {/* Todo : formulaire de modification de la liste avec dedans un bouton pour supprimer */}
    </DataState>
  );
};

export default MyWishlist;

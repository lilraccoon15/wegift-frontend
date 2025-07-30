import { useManageMyWish } from "../../features/wishlists/MyWish/useManageMyWish";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import EditWishForm from "../../features/wishlists/EditWish/EditWishForm";
import { CLIENT_ENV } from "../../config/clientEnv";

const MyWish = () => {
  const {
    id,
    wish,
    loading,
    error,
    showConfirm,
    setShowConfirm,
    wishToDelete,
    setWishToDelete,
    handleDelete,
    openEditModal,
    setOpenEditModal,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    link,
    setLink,
    picturePreview,
    handlePictureChange,
    handleEditSubmit,
    errorEdit,
    isSubmitting,
    status,
    handleStatusChange,
  } = useManageMyWish();

  const DEFAULT_PICTURE_URL_WISH = "/uploads/wishPictures/default-wish.png";
  const BACKEND_URL_WISHLIST = CLIENT_ENV.VITE_BACKEND_URL_WISHLIST;

  if (!id) return <p>Paramètre ID manquant</p>;

  return (
    <DataState loading={loading} error={error}>
      {wish && (
        <>
          <div className="title-return">
            <BackButton />
            {wish.title && <h1>{wish.title}</h1>}
          </div>

          <div className="actions">
            <button onClick={() => setOpenEditModal(true)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => {
                setWishToDelete(wish);
                setShowConfirm(true);
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
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
              <a href={wish.link} target="_blank" rel="noopener noreferrer">
                Voir le lien
              </a>
            )}
          </p>

          {showConfirm && wishToDelete && (
            <ConfirmModal
              title="Supprimer ce souhait ?"
              message={`Souhaitez-vous vraiment supprimer le souhait "${wishToDelete.title}" ?`}
              onClose={() => {
                setShowConfirm(false);
                setWishToDelete(null);
              }}
              onConfirm={handleDelete}
              confirmLabel="Supprimer"
              cancelLabel="Annuler"
            />
          )}

          {openEditModal && (
            <Modal
              onClose={() => setOpenEditModal(false)}
              title="Modifier le souhait"
            >
              <div className="modal-body">
                <EditWishForm
                  onSubmit={handleEditSubmit}
                  title={title}
                  onTitleChange={(e) => setTitle(e.target.value)}
                  description={description}
                  onDescriptionChange={(e) => setDescription(e.target.value)}
                  price={price}
                  onPriceChange={(e) => setPrice(e.target.value)}
                  link={link}
                  onLinkChange={(e) => setLink(e.target.value)}
                  onPictureChange={handlePictureChange}
                  picturePreview={picturePreview}
                  error={errorEdit}
                  buttondisabled={isSubmitting}
                  status={status}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </Modal>
          )}
        </>
      )}
    </DataState>
  );
};

export default MyWish;

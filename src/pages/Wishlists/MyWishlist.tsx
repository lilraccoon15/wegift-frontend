import { Link, useNavigate } from "react-router-dom";
import { useManageMyWishlist } from "../../features/wishlists/MyWishlist/useManageMyWishlist";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import Modal from "../../components/ui/Modal";
import CreateWishModalContent from "../../components/ui/CreateWishModalContent";

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
  } = useManageMyWishlist(navigate);

  if (!id) return <p>Paramètre ID manquant</p>;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

  return (
    <DataState loading={loading} error={error}>
      <div className="title-return">
        <BackButton />
        {wishlist?.data?.wishlist?.title && (
          <h1>{wishlist.data.wishlist.title}</h1>
        )}
      </div>

      <ul className="card-list">
        {creationMode === "none" && (
          <li onClick={() => setCreationMode("choice")} className="card">
            <div className="new-card">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="card-infos">
              <h2>Créer un souhait</h2>
            </div>
          </li>
        )}

        {(wishes ?? []).map((wish) => (
          <Link to={`/my-wish/${wish.id}`} className="card" key={wish.id}>
            <li>
              {wish.picture ? (
                <img
                  src={`${BACKEND_URL}${wish.picture}`}
                  alt={`${wish.title} picture`}
                />
              ) : (
                <div className="replace-card-picture"></div>
              )}
              <div className="card-infos">
                <h2>{wish.title}</h2>
              </div>
              <button onClick={() => openEditForm(wish)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </li>
          </Link>
        ))}
      </ul>

      {creationMode !== "none" && (
        <Modal onClose={() => setCreationMode("none")} title="Créer un souhait">
          <CreateWishModalContent
            setModeNone={() => setCreationMode("none")}
            onSubmit={handleCreateSubmit}
            title={title}
            onTitleChange={(e) => setTitle(e.target.value)}
            onPictureChange={handlePictureChange}
            description={description}
            onDescriptionChange={(e) => setDescription(e.target.value)}
            picturePreview={picturePreview}
            price={price}
            onPriceChange={(e) => setPrice(e.target.value)}
            link={link}
            onLinkChange={(e) => setLink(e.target.value)}
            error={submitError}
            buttondisabled={isSubmitting}
          />
        </Modal>
      )}
    </DataState>
  );
};

export default MyWishlist;

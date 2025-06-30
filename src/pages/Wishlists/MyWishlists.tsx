import CreateWishlistForm from "../../features/wishlists/CreateWishlist/CreateWishlistForm";
import { useMyWishlists } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import { Link, useNavigate } from "react-router-dom";
import EditWishlistForm from "../../features/wishlists/EditWishlist/EditWishlistForm";
import { useManageMyWishlists } from "../../features/wishlists/MyWishlists/useManageMyWishlists";

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
        handleDelete,
        openEditForm,
        closeEditForm,
    } = useManageMyWishlists(navigate);

    const { data: wishlists, error } = useMyWishlists();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h1>Mes listes</h1>
            {wishlists?.length === 0 && <p>Vous n'avez pas de wishlist</p>}
            {wishlists && wishlists?.length > 0 && (
                <ul className="wishlists">
                    {wishlists.map((w) => (
                        <li key={w.id} className="wishlist-card">
                            <Link to={`/my-wishlist/${w.id}`}>
                                {w.picture ? (
                                    <img
                                        src={`${BACKEND_URL}${w.picture}`}
                                        alt={`${w.title} picture`}
                                    />
                                ) : (
                                    <div className="replace-wishlist-picture"></div>
                                )}
                            </Link>
                            <div className="wishlist-infos">
                                <h2>{w.title}</h2>
                                <span>{w.wishesCount} souhaits</span>
                            </div>

                            <button onClick={() => openEditForm(w)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        </li>
                    ))}
                    <li
                        onClick={() => setShowCreate(true)}
                        className="wishlist-card new-wishlist"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </li>
                </ul>
            )}
            {openEdition && wishlistToEdit && (
                <div>
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
                        onPublishedChange={(e) => setPublished(e.target.value)}
                        error={submitError}
                        buttondisabled={isSubmitting}
                        handleDelete={handleDelete}
                    />
                    <button onClick={closeEditForm}>Annuler</button>
                </div>
            )}

            {showCreate && (
                <CreateWishlistForm
                    onSubmit={handleCreateSubmit}
                    title={title}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    onPictureChange={handlePictureChange}
                    description={description}
                    onDescriptionChange={(e) => setDescription(e.target.value)}
                    picturePreview={picturePreview}
                    access={access}
                    onAccessChange={(e) => setAccess(e.target.value)}
                    error={submitError}
                    buttondisabled={isSubmitting}
                />
            )}
        </>
    );
};

export default MyWishlists;

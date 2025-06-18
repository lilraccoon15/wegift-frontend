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

    const { data: wishlists, error, isLoading: loading } = useMyWishlists();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h2>Mes listes</h2>
            {wishlists?.length === 0 && <p>Vous n'avez pas de wishlist</p>}
            {wishlists && wishlists?.length > 0 && (
                <ul>
                    {wishlists.map((w) => (
                        <li key={w.id}>
                            <Link to={`/my-wishlist/${w.id}`}>{w.title}</Link>
                            <button onClick={() => openEditForm(w)}>Éditer</button>
                        </li>
                    ))}
                </ul>
            )}
             {openEdition && wishlistToEdit && (
                <div>
                    <EditWishlistForm
                        onSubmit={handleEditSubmit}
                        title={title}
                        onTitleChange={(e) =>
                            setTitle(e.target.value)
                        }
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
            
            <p onClick={() => setShowCreate(true)}>Créer une wishlist</p>
            {showCreate && (
                <CreateWishlistForm
                    onSubmit={handleCreateSubmit}
                    title={title}
                    onTitleChange={(e) =>
                        setTitle(e.target.value)
                    }
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
                />
            )}
        </>
    );
};

export default MyWishlists;

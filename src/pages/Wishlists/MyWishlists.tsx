import CreateWishlistForm from "../../features/wishlists/CreateWishlist/CreateWishlistForm";
import { useMyWishlists } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import { Link, useNavigate } from "react-router-dom";
import EditWishlistForm from "../../features/wishlists/EditWishlist/EditWishlistForm";
import { useManageMyWishlists } from "../../features/wishlists/MyWishlists/useManageMyWishlists";
import DataState from "../../components/ui/DataState";

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
        mode,
        setMode,
        participants,
        setParticipants,
    } = useManageMyWishlists(navigate);

    const { data: wishlists, error, isLoading } = useMyWishlists();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    return (
        <DataState loading={isLoading} error={error}>
            <ul className="card-list">
                <li onClick={() => setShowCreate(true)} className="card">
                    <div className="new-card">
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="card-infos">
                        <h2>Créer une wishlist</h2>
                    </div>
                </li>

                {wishlists && wishlists?.length > 0 && (
                    <>
                        {wishlists.map((w) => (
                            <li key={w.id} className="card">
                                <Link to={`/my-wishlist/${w.id}`}>
                                    {w.picture ? (
                                        <img
                                            src={`${BACKEND_URL}${w.picture}`}
                                            alt={`${w.title} picture`}
                                        />
                                    ) : (
                                        <div className="replace-card-picture"></div>
                                    )}
                                </Link>
                                <div className="card-infos">
                                    <h2>{w.title}</h2>
                                    <span>
                                        {w.wishesCount} souhait
                                        {(w.wishesCount ?? 0) > 1 ? "s" : ""}
                                    </span>
                                </div>

                                <button onClick={() => openEditForm(w)}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                {w.mode == "collaborative" ? (
                                    <i className="fa-solid fa-user-group"></i>
                                ) : (
                                    ""
                                )}
                                {w.published == false ? (
                                    <i className="fa-solid fa-lock"></i>
                                ) : (
                                    ""
                                )}
                            </li>
                        ))}
                    </>
                )}
            </ul>

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
                        mode={mode}
                        onModeChange={(e) => setMode(e.target.value)}
                        participants={participants}
                        setParticipants={setParticipants}
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
                    mode={mode}
                    onModeChange={(e) => setMode(e.target.value)}
                    participants={participants}
                    setParticipants={setParticipants}
                />
            )}
        </DataState>
    );
};

export default MyWishlists;

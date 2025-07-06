import { Link, useNavigate } from "react-router-dom";
import CreateWishForm from "../../features/wishlists/CreateWish/CreateWishForm";
import { useManageMyWishlist } from "../../features/wishlists/MyWishlist/useManageMyWishlist";
import EditWishForm from "../../features/wishlists/EditWish/EditWishForm";
import ScrapWishForm from "../../features/wishlists/CreateWish/ScrapWishForm";

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
        openEdition,
        wishToEdit,
        handleEditSubmit,
        handleDelete,
        closeEditForm,
    } = useManageMyWishlist(navigate);

    if (!id) return <p>Paramètre ID manquant</p>;

    if (!wishlist) return <p>Wishlist non trouvée</p>;

    return (
        <>
            <h1>{wishlist.title}</h1>
            {creationMode === "none" && (
                <p onClick={() => setCreationMode("choice")}>
                    Créer un souhait
                </p>
            )}

            {creationMode === "choice" && (
                <div>
                    <button onClick={() => setCreationMode("form")}>
                        Créer avec formulaire
                    </button>
                    <button onClick={() => setCreationMode("urlScrap")}>
                        Créer avec URL
                    </button>
                    <button onClick={() => setCreationMode("none")}>
                        Annuler
                    </button>
                </div>
            )}

            {creationMode === "form" && (
                <>
                    <CreateWishForm
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
                    />
                    <button onClick={() => setCreationMode("none")}>
                        Annuler
                    </button>
                </>
            )}

            {creationMode === "urlScrap" && (
                <>
                    <ScrapWishForm />

                    <button onClick={() => setCreationMode("none")}>
                        Annuler
                    </button>
                </>
            )}
            {wishes?.length === 0 && (
                <p>Vous n'avez pas encore de souhait dans cette liste.</p>
            )}
            {wishes && wishes?.length > 0 && (
                <ul>
                    {wishes?.map((wish) => (
                        <li key={wish.id}>
                            <Link to={`/wish/${wish.id}`}>{wish.title}</Link>{" "}
                            <button onClick={() => openEditForm(wish)}>
                                Éditer
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {openEdition && wishToEdit && (
                <div>
                    <EditWishForm
                        onSubmit={handleEditSubmit}
                        title={title}
                        onTitleChange={(e) => setTitle(e.target.value)}
                        onPictureChange={handlePictureChange}
                        description={description}
                        onDescriptionChange={(e) =>
                            setDescription(e.target.value)
                        }
                        picturePreview={picturePreview}
                        link={link}
                        onLinkChange={(e) => setLink(e.target.value)}
                        price={price}
                        onPriceChange={(e) => setPrice(e.target.value)}
                        error={submitError}
                        buttondisabled={isSubmitting}
                        handleDelete={handleDelete}
                    />
                    <button onClick={closeEditForm}>Annuler</button>
                </div>
            )}
        </>
    );
};

export default MyWishlist;

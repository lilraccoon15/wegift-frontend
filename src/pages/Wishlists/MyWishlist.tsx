import { Link, useNavigate } from "react-router-dom";
import CreateWishForm from "../../features/wishlists/CreateWish/CreateWishForm";
import { useManageMyWishlist } from "../../features/wishlists/MyWishlist/useManageMyWishlist";
import EditWishForm from "../../features/wishlists/EditWish/EditWishForm";
import ScrapWishForm from "../../features/wishlists/CreateWish/ScrapWishForm";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";

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
        loading,
        error,
    } = useManageMyWishlist(navigate);

    if (!id) return <p>Paramètre ID manquant</p>;

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    return (
        <DataState loading={loading} error={error}>
            <div className="title-return">
                <BackButton />
                <h1>{wishlist.data.wishlist.title}</h1>
            </div>
            <ul className="card-list">
                {creationMode === "none" && (
                    <li
                        onClick={() => setCreationMode("choice")}
                        className="card"
                    >
                        <div className="new-card">
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="card-infos">
                            <h2>Créer un souhait</h2>
                        </div>
                    </li>
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
                {wishes && wishes?.length > 0 && (
                    <>
                        {wishes?.map((wish) => (
                            <li key={wish.id} className="card">
                                <Link to={`/my-wish/${wish.id}`}>
                                    {wish.picture ? (
                                        <img
                                            src={`${BACKEND_URL}${wish.picture}`}
                                            alt={`${wish.title} picture`}
                                        />
                                    ) : (
                                        <div className="replace-card-picture"></div>
                                    )}
                                </Link>{" "}
                                <div className="card-infos">
                                    <h2>{wish.title}</h2>
                                </div>
                                <button onClick={() => openEditForm(wish)}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </li>
                        ))}
                    </>
                )}
            </ul>
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
        </DataState>
    );
};

export default MyWishlist;

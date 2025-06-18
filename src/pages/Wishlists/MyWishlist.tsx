import CreateWishForm from "../../features/wishlists/CreateWish/CreateWishForm";
import { useManageMyWishlist } from "../../features/wishlists/MyWishlist/useManageMyWishlist";

const MyWishlist = () => {
    
    const {
        id,
        loadingWishes,
        loadingWishlist,
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
        wishes
    } = useManageMyWishlist();
    
    if (!id) return <p>Paramètre ID manquant</p>;

    if (loadingWishlist || loadingWishes) return <p>Chargement...</p>;
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
                <><CreateWishForm
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
                <button onClick={() => setCreationMode("none")}>
                        Annuler
                    </button></>
            )}

            {creationMode === "urlScrap" && (
                <><p>scrapping</p>
                {/* <UrlScrappingForm
                    onCancel={() => setCreationMode("none")}
                    onSuccess={() => {
                        queryClient.invalidateQueries({
                            queryKey: ["myWishes"],
                        });
                        setCreationMode("none");
                    }}
                /> */}

                <button onClick={() => setCreationMode("none")}>
                        Annuler
                    </button></>
                
            )}
            {wishes && wishes.length === 0 ? (
                <p>Vous n'avez pas encore de souhait dans cette liste.</p>
            ) : (
                <ul>
                    {wishes?.map((wish) => (
                        <li key={wish.id}>{wish.title}</li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default MyWishlist;

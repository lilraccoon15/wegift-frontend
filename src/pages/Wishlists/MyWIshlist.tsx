import { useNavigate, useParams } from "react-router-dom";
import { useWishesByWishlistId } from "../../features/wishlists/MyWishes/MyWishesHelpers";
import { useMyWishlistById } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import { useEffect, useState } from "react";
import CreateWishForm from "../../features/wishlists/CreateWish/CreateWishForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWish } from "../../features/wishlists/CreateWish/CreateWishHelpers";

const MyWishlist = () => {
    const { id } = useParams<{ id: string }>();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: wishlist, isLoading: loadingWishlist } = useMyWishlistById(
        id ?? ""
    );
    const { data: wishes, isLoading: loadingWishes } = useWishesByWishlistId(
        id ?? ""
    );

    const [showCreate, setShowCreate] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [price, setPrice] = useState("");
    const [link, setLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [creationMode, setCreationMode] = useState<
        "none" | "choice" | "form" | "urlScrap"
    >("none");

    if (!id) return <p>Paramètre ID manquant</p>;

    if (loadingWishlist || loadingWishes) return <p>Chargement...</p>;
    if (!wishlist) return <p>Wishlist non trouvée</p>;

    useEffect(() => {
        if (picture) {
            const objectUrl = URL.createObjectURL(picture);
            setPicturePreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPicturePreview(null);
        }
    }, [picture]);

    const mutation = useMutation({
        mutationFn: createWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myWishes"] });

            setTitle("");
            setDescription("");
            setPicture(null);
            setPicturePreview(null);
            setPrice("");
            setLink("");
            setShowCreate(false);

            // navigate("/my-wishlists");
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
            ];
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                alert("Format d’image non supporté.");
                return;
            }

            if (file.size > maxSizeInBytes) {
                alert("Fichier trop volumineux. Maximum 5 Mo.");
                return;
            }

            setPicture(file);
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        mutation.mutate({
            title,
            description: description ?? undefined,
            picture: picture ?? undefined,
            price,
            link,
        });
    };

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

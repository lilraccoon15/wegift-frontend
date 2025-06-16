import { useEffect, useState } from "react";
import CreateWishlistForm from "../../features/wishlists/CreateWishlist/CreateWishlistForm";
import { useMyWishlists } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import { createWishlist } from "../../features/wishlists/CreateWishlist/CreateWishlistHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import EditWishlistForm from "../../features/wishlists/EditWishlist/EditWishlistForm";
import{ editWishlist, deleteWishlist} from "../../features/wishlists/EditWishlist/EditWishlistHelpers";

const MyWishlists = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: wishlists, error, isLoading: loading } = useMyWishlists();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [access, setAccess] = useState("");
    const [published, setPublished] = useState("1");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [openEdition, setOpenEdition] = useState(false);
    const [wishlistToEdit, setWishlistToEdit] = useState<any | null>(null);

    useEffect(() => {
        if (picture) {
            const objectUrl = URL.createObjectURL(picture);
            setPicturePreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPicturePreview(null);
        }
    }, [picture]);

    useEffect(() => {
        if (wishlistToEdit) {
            setTitle(wishlistToEdit.title || "");
            setDescription(wishlistToEdit.description || "");
            setPicturePreview(wishlistToEdit.picture || null); 
            setAccess(wishlistToEdit.access || "private");
            setPublished(wishlistToEdit.published ? "1" : "0");
        }
    }, [wishlistToEdit]);

    const mutation = useMutation({
        mutationFn: createWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myWishlists"] });

            setTitle("");
            setDescription("");
            setPicture(null);
            setPicturePreview(null);
            setAccess("");
            setShowCreate(false);

            navigate("/my-wishlists");
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });

    const editMutation = useMutation({
        mutationFn: editWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myWishlists"] });
            resetForm();
            setOpenEdition(false);
            setWishlistToEdit(null);
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myWishlists"] });
            resetForm();
            setOpenEdition(false);
            setWishlistToEdit(null);
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
    });

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPicture(null);
        setPicturePreview(null);
        setAccess("");
        setPublished("");
        setIsSubmitting(false);
        setSubmitError(null);
    };

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
            access,
            picture: picture ?? undefined,
        });
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!wishlistToEdit) return;

        setIsSubmitting(true);
        setSubmitError(null);

        editMutation.mutate({
            id: wishlistToEdit.id,
            title,
            description: description ?? undefined,
            access,
            picture: picture ?? undefined,
            published: published === "1"
        });
    }

    const openEditForm = (wishlist: any) => {
        setWishlistToEdit(wishlist);
        setOpenEdition(true);
    };

    const closeEditForm = () => {
        setOpenEdition(false);
        setWishlistToEdit(null);
        resetForm();
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!wishlistToEdit) return;

        const confirmDelete = window.confirm("Souhaitez-vous vraiment supprimer cette wishlist ?");
        if (!confirmDelete) return;

        deleteMutation.mutate(wishlistToEdit.id);
    }

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

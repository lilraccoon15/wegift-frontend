import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMyWishlistById } from "../MyWishlists/MyWishlistsHelpers";
import { useWishesByWishlistId } from "../MyWishes/MyWishesHelpers";
import { useEffect, useState } from "react";
import { createWish } from "../CreateWish/CreateWishHelpers";
import { deleteWish, editWish } from "../EditWish/EditWishHelpers";

export const useManageMyWishlist = (navigate: any) => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

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
    const [openEdition, setOpenEdition] = useState(false);
    const [wishToEdit, setWishToEdit] = useState<any | null>(null);

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
        if (wishToEdit) {
            setTitle(wishToEdit.title || "");
            setDescription(wishToEdit.description || "");
            setPicturePreview(wishToEdit.picture || null);
            setLink(wishToEdit.link || "");
            setPrice(wishToEdit.price || "");
        }
    }, [wishToEdit]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPicture(null);
        setPicturePreview(null);
        setPrice("");
        setLink("");
        setIsSubmitting(false);
        setSubmitError(null);
    };

    const mutation = useMutation({
        mutationFn: createWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes", id] });

            resetForm();
            setShowCreate(false);
            navigate(`/wishlist/${id}`);
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });

    const editMutation = useMutation({
        mutationFn: editWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes"] });
            resetForm();
            setOpenEdition(false);
            setWishToEdit(null);
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => setIsSubmitting(false),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes"] });
            resetForm();
            setOpenEdition(false);
            setWishToEdit(null);
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
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
            wishlistId: id ?? "",
            description: description ?? undefined,
            picture: picture ?? undefined,
            price: price ? Number(price) : undefined,
            link: link ?? undefined,
        });
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!wishToEdit) return;
        setIsSubmitting(true);
        setSubmitError(null);

        editMutation.mutate({
            id: wishToEdit.id,
            title,
            description: description ?? undefined,
            link: link ?? undefined,
            picture: picture ?? undefined,
            price: price ? Number(price) : undefined,
        });
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!wishToEdit) return;
        const confirmDelete = window.confirm(
            "Souhaitez-vous vraiment supprimer ce souhait ?"
        );
        if (!confirmDelete) return;
        deleteMutation.mutate(wishToEdit.id);
    };

    const openEditForm = (wishlist: any) => {
        setWishToEdit(wishlist);
        setOpenEdition(true);
    };

    const closeEditForm = () => {
        setOpenEdition(false);
        setWishToEdit(null);
        resetForm();
    };

    return {
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
        wishes,
        openEditForm,
        openEdition,
        wishToEdit,
        handleEditSubmit,
        handleDelete,
        closeEditForm,
    };
};

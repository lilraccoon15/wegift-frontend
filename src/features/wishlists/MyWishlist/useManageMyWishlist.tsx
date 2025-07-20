import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMyWishlistById } from "../MyWishlists/MyWishlistsHelpers";
import {
    useMyWishesByWishlistId,
    type Wish,
} from "../MyWishes/MyWishesHelpers";
import { createWish, scrapWish } from "../CreateWish/CreateWishHelpers";
import { deleteWish, editWish } from "../EditWish/EditWishHelpers";
import { useCombinedState } from "../../../hooks/useCombineState";
import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";

export const useManageMyWishlist = (navigate: any) => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    // =======================
    // Queries
    // =======================
    const {
        data: wishlist,
        isLoading: loadingWishlist,
        error: errorWishlist,
    } = useMyWishlistById(id ?? "");
    const {
        data: wishes,
        isLoading: loadingWishes,
        error: errorWishes,
    } = useMyWishesByWishlistId(id ?? "");
    const { data: currentUser } = useMyProfile();

    const { loading, error } = useCombinedState([
        { loading: loadingWishlist, error: errorWishlist },
        { loading: loadingWishes, error: errorWishes },
    ]);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    // =======================
    // UI & Form States
    // =======================
    const [creationMode, setCreationMode] = useState<
        "none" | "choice" | "form" | "urlScrap"
    >("none");
    const [showCreate, setShowCreate] = useState(false);
    const [openEdition, setOpenEdition] = useState(false);
    const [wishToEdit, setWishToEdit] = useState<Wish | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [wishToDelete, setWishToDelete] = useState<Wish | null>(null);
    const [optionsWishId, setOptionsWishId] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [price, setPrice] = useState("");
    const [link, setLink] = useState("");
    const [url, setUrl] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmittingScrapping, setIsSubmittingScrapping] = useState(false);
    const [submitErrorScrapping, setSubmitErrorScrapping] = useState<
        string | null
    >(null);

    // =======================
    // Effects
    // =======================
    useEffect(() => {
        if (picture) {
            const objectUrl = URL.createObjectURL(picture);
            setPicturePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        setPicturePreview(null);
    }, [picture]);

    useEffect(() => {
        if (!wishToEdit) return;
        setTitle(wishToEdit.title || "");
        setDescription(wishToEdit.description || "");
        setPicturePreview(wishToEdit.picture || null);
        setLink(wishToEdit.link || "");
        setPrice(wishToEdit.price || "");
    }, [wishToEdit]);

    // =======================
    // Mutations
    // =======================
    const mutation = useMutation({
        mutationFn: createWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes", id] });
            resetForm();
            setShowCreate(false);
            navigate(`/wishlist/${id}`);
        },
        onError: (error: any) =>
            setSubmitError(error.message || "Erreur inconnue"),
        onSettled: () => setIsSubmitting(false),
    });

    const scrapMutation = useMutation({
        mutationFn: scrapWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes", id] });
            setUrl("");
            setCreationMode("none");
        },
        onError: (error: any) =>
            setSubmitErrorScrapping(error.message || "Erreur inconnue"),
        onSettled: () => setIsSubmittingScrapping(false),
    });

    const editMutation = useMutation({
        mutationFn: editWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes"] });
            resetForm();
            setOpenEdition(false);
            setWishToEdit(null);
        },
        onError: (error: any) =>
            setSubmitError(error.message || "Erreur inconnue"),
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
        onError: (error: any) =>
            setSubmitError(error.message || "Erreur inconnue"),
    });

    // =======================
    // Handlers
    // =======================
    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        const maxSize = 5 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            alert("Format d’image non supporté.");
            return;
        }

        if (file.size > maxSize) {
            alert("Fichier trop volumineux. Maximum 5 Mo.");
            return;
        }

        setPicture(file);
    };

    const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        mutation.mutate({
            title,
            wishlistId: id ?? "",
            description: description || undefined,
            picture: picture || undefined,
            price: price ? Number(price) : undefined,
            link: link || undefined,
        });
    };

    const handleScrappingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingScrapping(true);
        setSubmitErrorScrapping(null);

        scrapMutation.mutate({
            url,
            wishlistId: id ?? "",
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
            description: description || undefined,
            link: link || undefined,
            picture: picture || undefined,
            price: price ? Number(price) : undefined,
        });
    };

    const handleDeleteButton = (wish: Wish) => {
        if (window.confirm("Souhaitez-vous vraiment supprimer ce souhait ?")) {
            deleteMutation.mutate(wish.id);
        }
    };

    // =======================
    // Helpers
    // =======================
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

    const confirmDelete = (wish: Wish) => {
        setWishToDelete(wish);
        setShowConfirm(true);
    };

    const openEditForm = (wish: Wish) => {
        setWishToEdit(wish);
        setOpenEdition(true);
    };

    const closeEditForm = () => {
        setOpenEdition(false);
        setWishToEdit(null);
        resetForm();
    };

    const toggleOptions = (id: string) => {
        setOptionsWishId((prev) => (prev === id ? null : id));
    };

    const closeOptions = () => setOptionsWishId(null);

    // =======================
    // Return
    // =======================
    return {
        id,
        wishlist,
        wishes,
        currentUser,
        BACKEND_URL,

        // UI States
        creationMode,
        setCreationMode,
        showCreate,
        setShowCreate,
        openEdition,
        wishToEdit,
        showConfirm,
        wishToDelete,
        optionsWishId,

        // Form fields
        title,
        setTitle,
        description,
        setDescription,
        picturePreview,
        price,
        setPrice,
        link,
        setLink,
        url,
        setUrl,

        // Status
        loading,
        error,
        loadingWishes,
        loadingWishlist,
        isSubmitting,
        submitError,
        isSubmittingScrapping,
        submitErrorScrapping,

        // Handlers
        handleCreateSubmit,
        handleScrappingSubmit,
        handleEditSubmit,
        handleDeleteButton,
        handlePictureChange,
        confirmDelete,
        openEditForm,
        closeEditForm,
        toggleOptions,
        closeOptions,
        setWishToDelete,
        setShowConfirm,
        setOptionsWishId,
    };
};

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, type NavigateFunction } from "react-router-dom";
import {
    useMyWishlistById,
    type Wishlist,
} from "../MyWishlists/MyWishlistsHelpers";
import {
    useMyWishesByWishlistId,
    type Wish,
} from "../MyWishes/MyWishesHelpers";
import { createWish, scrapWish } from "../CreateWish/CreateWishHelpers";
import { deleteWish, editWish } from "../EditWish/EditWishHelpers";
import {
    deleteWishlist,
    editWishlist,
} from "../EditWishlist/EditWishlistHelpers";
import { useCombinedState } from "../../../hooks/useCombineState";
import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";

export const useManageMyWishlist = (navigate: NavigateFunction) => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    // =======================
    // Queries
    // =======================
    const {
        data: wishlistResponse,
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
    // UI States
    // =======================
    const [creationMode, setCreationMode] = useState<
        "none" | "choice" | "form" | "urlScrap"
    >("none");
    const [openWishEdition, setOpenWishEdition] = useState(false);
    const [openWishlistEdition, setOpenWishlistEdition] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmType, setConfirmType] = useState<"wish" | "wishlist" | null>(
        null
    );
    const [optionsWishId, setOptionsWishId] = useState<string | null>(null);

    // =======================
    // Wish States
    // =======================
    const [wishToEdit, setWishToEdit] = useState<Wish | null>(null);
    const [wishToDelete, setWishToDelete] = useState<Wish | null>(null);
    const [wishTitle, setWishTitle] = useState("");
    const [wishDescription, setWishDescription] = useState("");
    const [wishPicture, setWishPicture] = useState<File | null>(null);
    const [wishPicturePreview, setWishPicturePreview] = useState<string | null>(
        null
    );
    const [wishPrice, setWishPrice] = useState("");
    const [wishLink, setWishLink] = useState("");
    const [wishIsSubmitting, setWishIsSubmitting] = useState(false);
    const [wishSubmitError, setWishSubmitError] = useState<string | null>(null);
    const [url, setUrl] = useState("");
    const [isSubmittingScrapping, setIsSubmittingScrapping] = useState(false);
    const [submitErrorScrapping, setSubmitErrorScrapping] = useState<
        string | null
    >(null);

    // =======================
    // Wishlist States
    // =======================
    const [wishlistToEdit, setWishlistToEdit] = useState<Wishlist | null>(null);
    const [wishlistToDelete, setWishlistToDelete] = useState<Wishlist | null>(
        null
    );
    const [wishlistTitle, setWishlistTitle] = useState("");
    const [wishlistDescription, setWishlistDescription] = useState("");
    const [wishlistPicture, setWishlistPicture] = useState<File | null>(null);
    const [wishlistPicturePreview, setWishlistPicturePreview] = useState<
        string | null
    >(null);
    const [wishlistAccess, setWishlistAccess] = useState("public");
    const [wishlistPublished, setWishlistPublished] = useState("1");
    const [wishlistMode, setWishlistMode] = useState("individual");
    const [wishlistParticipants, setWishlistParticipants] = useState<User[]>(
        []
    );
    const [wishlistIsSubmitting, setWishlistIsSubmitting] = useState(false);
    const [wishlistSubmitError, setWishlistSubmitError] = useState<
        string | null
    >(null);

    // =======================
    // Effects
    // =======================
    useEffect(() => {
        if (wishPicture) {
            const objectUrl = URL.createObjectURL(wishPicture);
            setWishPicturePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        setWishPicturePreview(null);
    }, [wishPicture]);

    useEffect(() => {
        if (!wishToEdit) return;
        setWishTitle(wishToEdit.title || "");
        setWishDescription(wishToEdit.description || "");
        setWishPicturePreview(wishToEdit.picture || null);
        setWishLink(wishToEdit.link || "");
        setWishPrice(wishToEdit.price || "");
    }, [wishToEdit]);

    useEffect(() => {
        if (!wishlistToEdit) return;
        setWishlistTitle(wishlistToEdit.title || "");
        setWishlistDescription(wishlistToEdit.description || "");
        setWishlistPicturePreview(wishlistToEdit.picture || null);
        setWishlistAccess(wishlistToEdit.access ? "private" : "public");
        setWishlistPublished(wishlistToEdit.published ? "1" : "0");
        setWishlistMode(
            wishlistToEdit.mode === "collaborative"
                ? "collaborative"
                : "individual"
        );
        setWishlistParticipants(wishlistToEdit.participants || []);
    }, [wishlistToEdit]);

    // =======================
    // Mutations
    // =======================
    const mutation = useMutation({
        mutationFn: createWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes", id] });
            resetWishForm();
            setCreationMode("none");
        },
        onError: (error: Error) => setWishSubmitError(error.message),
        onSettled: () => setWishIsSubmitting(false),
    });

    const scrapMutation = useMutation({
        mutationFn: scrapWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes", id] });
            setUrl("");
            setCreationMode("none");
        },
        onError: (error: Error) => setSubmitErrorScrapping(error.message),
        onSettled: () => setIsSubmittingScrapping(false),
    });

    const editMutation = useMutation({
        mutationFn: editWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes"] });
            closeWishEditForm();
        },
        onError: (error: Error) => setWishSubmitError(error.message),
        onSettled: () => setWishIsSubmitting(false),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishes"] });
            closeWishEditForm();
        },
        onError: (error: Error) => setWishSubmitError(error.message),
    });

    const editWishlistMutation = useMutation({
        mutationFn: editWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            if (id)
                queryClient.invalidateQueries({ queryKey: ["wishlist", id] });
            closeWishlistEditForm();
        },
        onError: (error: Error) => setWishlistSubmitError(error.message),
        onSettled: () => setWishlistIsSubmitting(false),
    });

    const deleteWishlistMutation = useMutation({
        mutationFn: deleteWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            setShowConfirm(false);
            navigate("/my-wishlists");
        },
        onError: (error: Error) => setWishlistSubmitError(error.message),
    });

    // =======================
    // Handlers
    // =======================
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setWishIsSubmitting(true);
        setWishSubmitError(null);
        mutation.mutate({
            title: wishTitle,
            wishlistId: id ?? "",
            description: wishDescription || undefined,
            picture: wishPicture || undefined,
            price: wishPrice ? Number(wishPrice) : undefined,
            link: wishLink || undefined,
        });
    };

    const handleScrappingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingScrapping(true);
        setSubmitErrorScrapping(null);
        scrapMutation.mutate({ url, wishlistId: id ?? "" });
    };

    const handleWishEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!wishToEdit) return;
        setWishIsSubmitting(true);
        setWishSubmitError(null);
        editMutation.mutate({
            id: wishToEdit.id,
            title: wishTitle,
            description: wishDescription || undefined,
            link: wishLink || undefined,
            picture: wishPicture || undefined,
            price: wishPrice ? Number(wishPrice) : undefined,
        });
    };

    const handleWishlistEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!wishlistToEdit) return;
        setWishlistIsSubmitting(true);
        setWishlistSubmitError(null);

        editWishlistMutation.mutate({
            id: wishlistToEdit.id,
            title: wishlistTitle,
            description: wishlistDescription || undefined,
            picture: wishlistPicture || undefined,
            access: wishlistAccess,
            published: wishlistPublished === "1",
            mode: wishlistMode,
            participantIds: wishlistParticipants.map((p) => p.id),
        });
    };

    const handleWishDeleteConfirm = () => {
        if (!wishToDelete) return;
        deleteMutation.mutate(wishToDelete.id);
        setShowConfirm(false);
        setWishToDelete(null);
        setConfirmType(null);
    };

    const handleWishlistDeleteConfirm = () => {
        if (!wishlistToDelete) return;
        deleteWishlistMutation.mutate(wishlistToDelete.id);
        setShowConfirm(false);
        setWishlistToDelete(null);
        setConfirmType(null);
    };

    const handleWishPictureChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (
            !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
                file.type
            )
        ) {
            alert("Format d’image non supporté.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("Fichier trop volumineux. Maximum 5 Mo.");
            return;
        }
        setWishPicture(file);
    };

    const handleWishlistPictureChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (
            !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
                file.type
            )
        ) {
            alert("Format d’image non supporté.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("Fichier trop volumineux. Maximum 5 Mo.");
            return;
        }
        setWishlistPicture(file);
    };

    const resetWishForm = () => {
        setWishTitle("");
        setWishDescription("");
        setWishPicture(null);
        setWishPicturePreview(null);
        setWishPrice("");
        setWishLink("");
        setWishIsSubmitting(false);
        setWishSubmitError(null);
    };

    const resetWishlistForm = () => {
        setWishlistTitle("");
        setWishlistDescription("");
        setWishlistPicture(null);
        setWishlistPicturePreview(null);
        setWishlistParticipants([]);
        setWishlistAccess("public");
        setWishlistPublished("1");
        setWishlistMode("individual");
        setWishlistIsSubmitting(false);
        setWishlistSubmitError(null);
    };

    const confirmWishDelete = (wish: Wish) => {
        setWishToDelete(wish);
        setConfirmType("wish");
        setShowConfirm(true);
    };

    const confirmWishlistDelete = (wishlist: Wishlist) => {
        setWishlistToDelete(wishlist);
        setConfirmType("wishlist");
        setShowConfirm(true);
    };

    const openWishEditForm = (wish: Wish) => {
        setWishToEdit(wish);
        setOpenWishEdition(true);
    };

    const openWishlistEditForm = (wishlist: Wishlist) => {
        setWishlistToEdit(wishlist);
        setOpenWishlistEdition(true);
    };

    const closeWishEditForm = () => {
        setOpenWishEdition(false);
        setWishToEdit(null);
        resetWishForm();
    };

    const closeWishlistEditForm = () => {
        setOpenWishlistEdition(false);
        setWishlistToEdit(null);
        resetWishlistForm();
    };

    const toggleOptions = (id: string) => {
        setOptionsWishId((prev) => (prev === id ? null : id));
    };

    // =======================
    // Return
    // =======================
    return {
        // Identifiants & données
        id,
        wishlist: wishlistResponse?.data?.wishlist,
        wishes,
        currentUser,
        BACKEND_URL,

        // === UI States
        creationMode,
        setCreationMode,
        openWishEdition,
        openWishlistEdition,
        showConfirm,
        confirmType,
        optionsWishId,
        setOptionsWishId,

        // === Wish Form State
        wishTitle,
        setWishTitle,
        wishDescription,
        setWishDescription,
        wishPicturePreview,
        wishPrice,
        setWishPrice,
        wishLink,
        setWishLink,
        url,
        setUrl,

        // === Wishlist Form State
        wishlistTitle,
        setWishlistTitle,
        wishlistDescription,
        setWishlistDescription,
        wishlistPicturePreview,
        wishlistAccess,
        setWishlistAccess,
        wishlistPublished,
        setWishlistPublished,
        wishlistMode,
        setWishlistMode,
        wishlistParticipants,
        setWishlistParticipants,

        // === Status
        loading,
        error,
        wishIsSubmitting,
        wishSubmitError,
        isSubmittingScrapping,
        submitErrorScrapping,
        wishlistIsSubmitting,
        wishlistSubmitError,

        // === Handlers : Submissions
        handleCreateSubmit,
        handleScrappingSubmit,
        handleWishEditSubmit,
        handleWishlistEditSubmit,
        handleWishPictureChange,
        handleWishlistPictureChange,
        handleWishDeleteConfirm,
        handleWishlistDeleteConfirm,

        // === Actions : modals & confirmations
        confirmWishDelete,
        confirmWishlistDelete,
        openWishEditForm,
        openWishlistEditForm,
        closeWishEditForm,
        closeWishlistEditForm,
        toggleOptions,
        setShowConfirm,
        setConfirmType,

        // === Edition / Suppression en cours
        wishToEdit,
        setWishToEdit,
        wishlistToEdit,
        setWishlistToEdit,
        wishToDelete,
        setWishToDelete,
        wishlistToDelete,
        setWishlistToDelete,
    };
};

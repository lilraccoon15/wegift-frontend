import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlist } from "../CreateWishlist/CreateWishlistHelpers";
import {
    editWishlist,
    deleteWishlist,
} from "../EditWishlist/EditWishlistHelpers";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";

export const useManageMyWishlists = (navigate: any) => {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [access, setAccess] = useState("public");
    const [published, setPublished] = useState("1");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [openEdition, setOpenEdition] = useState(false);
    const [wishlistToEdit, setWishlistToEdit] = useState<any | null>(null);
    const [mode, setMode] = useState("individual");
    const [participants, setParticipants] = useState<User[]>([]);
    const [availableRules, setAvailableRules] = useState<
        { id: string; title: string; description?: string }[]
    >([]);

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
            setAccess(wishlistToEdit.access || "public");
            setPublished(wishlistToEdit.published ? "1" : "0");
            setMode(wishlistToEdit.access || "individual");
            setParticipants(wishlistToEdit.participants || []);
        }
    }, [wishlistToEdit]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPicture(null);
        setPicturePreview(null);
        setAccess("public");
        setPublished("1");
        setMode("individual");
        setIsSubmitting(false);
        setSubmitError(null);
        setParticipants([]);
    };

    const mutation = useMutation({
        mutationFn: createWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myWishlists"] });
            resetForm();
            setShowCreate(false);
            navigate("/dashboard");
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => setIsSubmitting(false),
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
        onSettled: () => setIsSubmitting(false),
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

    const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        mutation.mutate({
            title,
            description: description ?? undefined,
            access,
            picture: picture ?? undefined,
            mode,
            participantIds: participants.map((u) => u.id),
        });
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            published: published === "1",
            mode,
            participantIds: participants.map((u) => u.id),
        });
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!wishlistToEdit) return;
        const confirmDelete = window.confirm(
            "Souhaitez-vous vraiment supprimer cette wishlist ?"
        );
        if (!confirmDelete) return;
        deleteMutation.mutate(wishlistToEdit.id);
    };

    const openEditForm = (wishlist: any) => {
        setWishlistToEdit(wishlist);
        setOpenEdition(true);
    };

    const closeEditForm = () => {
        setOpenEdition(false);
        setWishlistToEdit(null);
        resetForm();
    };

    return {
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
    };
};

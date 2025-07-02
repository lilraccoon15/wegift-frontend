import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExchange } from "../CreateExchange/CreateExchangeHelpers";
import {
    editExchange,
    deleteExchange,
} from "../EditExchange/EditExchangeHelpers";

export const useManageMyExchanges = (navigate: any) => {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [openEdition, setOpenEdition] = useState(false);
    const [exchangeToEdit, setExchangeToEdit] = useState<any | null>(null);

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
        if (exchangeToEdit) {
            setTitle(exchangeToEdit.title || "");
            setDescription(exchangeToEdit.description || "");
            setPicturePreview(exchangeToEdit.picture || null);
        }
    }, [exchangeToEdit]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPicture(null);
        setPicturePreview(null);
        setIsSubmitting(false);
        setSubmitError(null);
    };

    const mutation = useMutation({
        mutationFn: createExchange,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myExchangess"] });
            resetForm();
            setShowCreate(false);
            navigate("/my-exchange");
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => setIsSubmitting(false),
    });

    const editMutation = useMutation({
        mutationFn: editExchange,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myExchanges"] });
            resetForm();
            setOpenEdition(false);
            setExchangeToEdit(null);
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => setIsSubmitting(false),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteExchange,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myExchanges"] });
            resetForm();
            setOpenEdition(false);
            setExchangeToEdit(null);
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
            picture: picture ?? undefined,
        });
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!exchangeToEdit) return;
        setIsSubmitting(true);
        setSubmitError(null);

        editMutation.mutate({
            id: exchangeToEdit.id,
            title,
            description: description ?? undefined,
            picture: picture ?? undefined,
        });
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!exchangeToEdit) return;
        const confirmDelete = window.confirm(
            "Souhaitez-vous vraiment supprimer cet échange ?"
        );
        if (!confirmDelete) return;
        deleteMutation.mutate(exchangeToEdit.id);
    };

    const openEditForm = (exchange: any) => {
        setExchangeToEdit(exchange);
        setOpenEdition(true);
    };

    const closeEditForm = () => {
        setOpenEdition(false);
        setExchangeToEdit(null);
        resetForm();
    };

    return {
        title,
        description,
        picturePreview,
        isSubmitting,
        submitError,
        showCreate,
        openEdition,
        exchangeToEdit,
        setTitle,
        setDescription,
        setShowCreate,
        handlePictureChange,
        handleCreateSubmit,
        handleEditSubmit,
        handleDelete,
        openEditForm,
        closeEditForm,
    };
};

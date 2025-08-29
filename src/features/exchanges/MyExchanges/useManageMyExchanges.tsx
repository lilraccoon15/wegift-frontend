import { useState, useEffect } from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useMyExchanges, type Exchange } from "./MyExchangesHelpers";
import {
    createExchange,
    fetchRules,
} from "../CreateExchange/CreateExchangeHelpers";
import {
    editExchange,
    deleteExchange,
    type Rule,
} from "../EditExchange/EditExchangeHelpers";
import {
    fetchProfile,
    type User,
} from "../../profile/ViewProfile/ViewProfileHelpers";
import type { NavigateFunction } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export type ParticipantWithStatus = User & { status: "accepted" | "pending" };

export const useManageMyExchanges = (navigate: NavigateFunction) => {
    const queryClient = useQueryClient();
    const { data: exchanges, error, isLoading } = useMyExchanges();
    const { user: currentUser } = useAuth();

    // =======================
    // UI & Form States
    // =======================
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [showCreate, setShowCreate] = useState(false);
    const [openEdition, setOpenEdition] = useState(false);
    const [exchangeToEdit, setExchangeToEdit] = useState<Exchange | null>(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [participants, setParticipants] = useState<ParticipantWithStatus[]>(
        []
    );
    const [availableRules, setAvailableRules] = useState<Rule[]>([]);
    const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);
    const [budget, setBudget] = useState("");

    const [loadingRules, setLoadingRules] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [exchangeToDelete, setExchangeToDelete] = useState<Exchange | null>(
        null
    );
    const [optionsExchangeId, setOptionsExchangeId] = useState<string | null>(
        null
    );

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
        setLoadingRules(true);
        fetchRules()
            .then(setAvailableRules)
            .catch(() => setSubmitError("Erreur lors du chargement des règles"))
            .finally(() => setLoadingRules(false));
    }, []);

    const participantIds = Array.from(
        new Set((exchangeToEdit?.participants ?? []).map((p) => p.userId))
    );

    const participantsQueries = useQueries({
        queries: participantIds.map((id) => ({
            queryKey: ["userProfile", id],
            queryFn: () => fetchProfile(id),
            enabled: !!id,
        })),
    });

    const participantsProfiles = participantsQueries
        .filter((q) => q.data)
        .map((q) => q.data as User);

    useEffect(() => {
        if (participantsProfiles.length > 0) {
            console.log(participants);
            setParticipants(
                (exchangeToEdit?.participants ?? []).map((p: any) => ({
                    id: p.userId,
                    pseudo: p.user?.pseudo ?? "",
                    picture: p.user?.picture ?? "",
                    birthDate: p.user?.birthDate ?? "",
                    description: p.user?.description ?? "",
                    status: p.acceptedAt ? "accepted" : "pending",
                }))
            );
        }
    }, [participantsProfiles]);

    useEffect(() => {
        if (!exchangeToEdit) return;

        const formatDateForInput = (date: string | null | undefined) =>
            date ? new Date(date).toISOString().split("T")[0] : "";

        setTitle(exchangeToEdit.title || "");
        setDescription(exchangeToEdit.description || "");
        setPicturePreview(exchangeToEdit.picture || null);
        setStartDate(formatDateForInput(exchangeToEdit.startDate));
        setEndDate(formatDateForInput(exchangeToEdit.endDate));
        setSelectedRuleIds(exchangeToEdit.rules?.map((r) => r.id) || []);
        setBudget(exchangeToEdit.budget?.toString() || "");
    }, [exchangeToEdit]);

    // =======================
    // Mutations
    // =======================
    const mutation = useMutation({
        mutationFn: createExchange,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myExchanges"] });
            resetForm();
            setShowCreate(false);
            navigate("/dashboard");
        },
        onError: (err: Error) =>
            setSubmitError(err.message || "Erreur inconnue"),
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
        onError: (err: Error) =>
            setSubmitError(err.message || "Erreur inconnue"),
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
        onError: (err: Error) =>
            setSubmitError(err.message || "Erreur inconnue"),
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
            description: description || undefined,
            picture: picture || undefined,
            participantIds: participants.map((p) => p.id),
            startDate,
            endDate,
            rules: selectedRuleIds,
            budget: budget ? parseFloat(budget) : undefined,
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
            description: description || undefined,
            picture: picture || undefined,
            participantIds: participants.map((p) => p.id),
            startDate,
            endDate,
            rules: selectedRuleIds,
            budget: budget ? parseFloat(budget) : undefined,
        });
    };

    const handleDeleteButton = (exchange: Exchange) => {
        deleteMutation.mutate(exchange.id);
    };

    // =======================
    // Helpers
    // =======================
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPicture(null);
        setPicturePreview(null);
        setIsSubmitting(false);
        setSubmitError(null);
        setStartDate("");
        setEndDate("");
        setParticipants([]);
        setSelectedRuleIds([]);
        setBudget("");
    };

    const confirmDelete = (exchange: Exchange) => {
        setExchangeToDelete(exchange);
        setShowConfirm(true);
    };

    const openEditForm = (exchange: Exchange) => {
        setExchangeToEdit(exchange);
        setOpenEdition(true);
    };

    const closeEditForm = () => {
        setOpenEdition(false);
        setExchangeToEdit(null);
        resetForm();
    };

    const toggleOptions = (id: string) => {
        setOptionsExchangeId((prev) => (prev === id ? null : id));
    };

    const closeOptions = () => setOptionsExchangeId(null);

    // =======================
    // Return
    // =======================
    return {
        title,
        description,
        picturePreview,
        isSubmitting,
        submitError,
        showCreate,
        openEdition,
        exchangeToEdit,
        startDate,
        endDate,
        participants,
        availableRules,
        selectedRuleIds,
        budget,
        exchanges,
        isLoading,
        error,
        currentUser,
        showConfirm,
        exchangeToDelete,
        optionsExchangeId,
        loadingRules,

        // Setters
        setTitle,
        setDescription,
        setStartDate,
        setEndDate,
        setParticipants,
        setSelectedRuleIds,
        setBudget,
        setShowCreate,
        setShowConfirm,
        setExchangeToDelete,
        setOptionsExchangeId,

        // Handlers
        handlePictureChange,
        handleCreateSubmit,
        handleEditSubmit,
        openEditForm,
        closeEditForm,
        confirmDelete,
        handleDeleteButton,
        toggleOptions,
        closeOptions,
    };
};

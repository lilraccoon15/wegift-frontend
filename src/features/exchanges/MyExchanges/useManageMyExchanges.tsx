import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createExchange,
  fetchRules,
} from "../CreateExchange/CreateExchangeHelpers";
import {
  editExchange,
  deleteExchange,
  type Rule,
} from "../EditExchange/EditExchangeHelpers";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import type { NavigateFunction } from "react-router-dom";
import { useMyExchanges, type Exchange } from "./MyExchangesHelpers";
import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";

export const useManageMyExchanges = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { data: exchanges, error, isLoading } = useMyExchanges();

  const { data: currentUser } = useMyProfile();
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
  const [participants, setParticipants] = useState<User[]>([]);
  const [availableRules, setAvailableRules] = useState<
    { id: string; title: string; description?: string }[]
  >([]);
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
    setLoadingRules(true);
    fetchRules()
      .then((rules) => setAvailableRules(rules))
      .catch((err) => {
        console.error("Erreur lors du chargement des règles :", err);
        setSubmitError("Erreur lors du chargement des règles");
      })
      .finally(() => setLoadingRules(false));
  }, []);

  useEffect(() => {
    if (exchangeToEdit) {
      setTitle(exchangeToEdit.title || "");
      setDescription(exchangeToEdit.description || "");
      setPicturePreview(exchangeToEdit.picture || null);
      setStartDate(exchangeToEdit.startDate ? exchangeToEdit.startDate : "");
      setEndDate(exchangeToEdit.endDate || "");
      setParticipants(exchangeToEdit.participants || []);
      setSelectedRuleIds(exchangeToEdit.rules?.map((r: Rule) => r.id) || []);
      setBudget(exchangeToEdit.budget?.toString() || "");
    }
  }, [exchangeToEdit]);

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

  const mutation = useMutation({
    mutationFn: createExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myExchanges"] });
      resetForm();
      setShowCreate(false);
      navigate("/dashboard");
    },
    onError: (error: Error) => {
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
    onError: (error: Error) => {
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
    onError: (error: Error) => {
      setSubmitError(error.message || "Erreur inconnue");
    },
  });

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
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
      participantIds: participants.map((u) => u.id),
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
      description: description ?? undefined,
      picture: picture ?? undefined,
      participantIds: participants.map((u) => u.id),
      startDate,
      endDate,
      rules: selectedRuleIds,
      budget: budget ? parseFloat(budget) : undefined,
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

  const confirmDelete = (exchange: Exchange) => {
    setExchangeToDelete(exchange);
    setShowConfirm(true);
  };

  const handleDeleteButton = (exchange: Exchange) => {
    const confirmDelete = window.confirm(
      "Souhaitez-vous vraiment supprimer cet échange ?"
    );
    if (!confirmDelete) return;

    deleteMutation.mutate(exchange.id);
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
    setStartDate,
    endDate,
    setEndDate,
    setTitle,
    setDescription,
    setShowCreate,
    handlePictureChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
    openEditForm,
    closeEditForm,
    participants,
    setParticipants,
    selectedRuleIds,
    setSelectedRuleIds,
    availableRules,
    budget,
    setBudget,
    exchanges,
    isLoading,
    error,
    currentUser,
    confirmDelete,
    optionsExchangeId,
    toggleOptions,
    showConfirm,
    exchangeToDelete,
    setShowConfirm,
    setExchangeToDelete,
    setOptionsExchangeId,
    handleDeleteButton,
    closeOptions,
    loadingRules,
  };
};

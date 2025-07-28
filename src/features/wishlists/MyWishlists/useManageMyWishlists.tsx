import { useState, useEffect } from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { type NavigateFunction } from "react-router-dom";
import { createWishlist } from "../CreateWishlist/CreateWishlistHelpers";
import {
  editWishlist,
  deleteWishlist,
} from "../EditWishlist/EditWishlistHelpers";
import { useMyWishlists, type Wishlist } from "./MyWishlistsHelpers";
import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";
import {
  fetchProfile,
  type User,
} from "../../profile/ViewProfile/ViewProfileHelpers";

export const useManageMyWishlists = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useMyProfile();
  const { data: wishlists, error, isLoading } = useMyWishlists();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

  // =======================
  // UI & Form States
  // =======================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [access, setAccess] = useState("public");
  const [published, setPublished] = useState("1");
  const [mode, setMode] = useState("individual");
  const [participants, setParticipants] = useState<User[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [openEdition, setOpenEdition] = useState(false);
  const [wishlistToEdit, setWishlistToEdit] = useState<Wishlist | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [wishlistToDelete, setWishlistToDelete] = useState<Wishlist | null>(
    null
  );

  const [optionsWishlistId, setOptionsWishlistId] = useState<string | null>(
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
    if (!wishlistToEdit) return;

    setTitle(wishlistToEdit.title || "");
    setDescription(wishlistToEdit.description || "");
    setPicturePreview(wishlistToEdit.picture || null);
    setAccess(wishlistToEdit.access ? "private" : "public");
    setPublished(wishlistToEdit.published ? "1" : "0");
    setMode(
      wishlistToEdit.mode === "collaborative" ? "collaborative" : "individual"
    );
  }, [wishlistToEdit]);

  const collaborators = (wishlistToEdit?.collaborators ?? []) as {
    userId: string;
  }[];

  const collaboratorProfilesQueries = useQueries({
    queries: collaborators.map((collab) => ({
      queryKey: ["userProfile", collab.userId],
      queryFn: () => fetchProfile(collab.userId),
      enabled: !!collab.userId,
    })),
  });

  useEffect(() => {
    if (
      !wishlistToEdit ||
      collaboratorProfilesQueries.some((q) => q.isLoading || q.isError)
    )
      return;

    const profiles = collaboratorProfilesQueries
      .map((q) => q.data)
      .filter((p): p is User => !!p);

    setParticipants(profiles);
  }, [wishlistToEdit, ...collaboratorProfilesQueries.map((q) => q.data)]);

  // =======================
  // Mutations
  // =======================
  const mutation = useMutation({
    mutationFn: createWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myWishlists"] });
      resetForm();
      setShowCreate(false);
      navigate("/dashboard");
    },
    onError: (error: Error) =>
      setSubmitError(error.message || "Erreur inconnue"),
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
    onError: (error: Error) =>
      setSubmitError(error.message || "Erreur inconnue"),
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
    onError: (error: Error) =>
      setSubmitError(error.message || "Erreur inconnue"),
  });

  // =======================
  // Handlers
  // =======================
  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
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
      access,
      picture: picture || undefined,
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
      description: description || undefined,
      access,
      picture: picture || undefined,
      published: published === "1",
      mode,
      participantIds: participants.map((u) => u.id),
    });
  };

  const handleDeleteButton = (wishlist: Wishlist) => {
    if (window.confirm("Souhaitez-vous vraiment supprimer cette wishlist ?")) {
      deleteMutation.mutate(wishlist.id);
    }
  };

  // =======================
  // Helpers
  // =======================
  const confirmDelete = (wishlist: Wishlist) => {
    setWishlistToDelete(wishlist);
    setShowConfirm(true);
  };

  const openEditForm = (wishlist: Wishlist) => {
    setWishlistToEdit(wishlist);
    setOpenEdition(true);
  };

  const closeEditForm = () => {
    setOpenEdition(false);
    setWishlistToEdit(null);
    setOptionsWishlistId(null);
    resetForm();
  };

  const toggleOptions = (id: string) => {
    setOptionsWishlistId((prev) => (prev === id ? null : id));
  };

  const closeOptions = () => setOptionsWishlistId(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPicture(null);
    setPicturePreview(null);
    setAccess("public");
    setPublished("1");
    setMode("individual");
    setParticipants([]);
    setIsSubmitting(false);
    setSubmitError(null);
  };

  // =======================
  // Return
  // =======================
  return {
    title,
    description,
    picturePreview,
    access,
    published,
    mode,
    participants,
    isSubmitting,
    submitError,
    showCreate,
    openEdition,
    wishlistToEdit,
    wishlistToDelete,
    showConfirm,
    optionsWishlistId,
    wishlists,
    currentUser,
    BACKEND_URL,
    error,
    isLoading,

    // setters
    setTitle,
    setDescription,
    setAccess,
    setPublished,
    setMode,
    setParticipants,
    setShowCreate,
    setWishlistToDelete,
    setShowConfirm,
    setOptionsWishlistId,

    // handlers
    handlePictureChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteButton,
    confirmDelete,
    openEditForm,
    closeEditForm,
    toggleOptions,
    closeOptions,
  };
};

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
import { useCombinedState } from "../../../hooks/useCombineState";
import { useMyProfile } from "../../profile/MyProfile/MyProfileHelpers";
import type { User } from "../../profile/ViewProfile/ViewProfileHelpers";
import {
  deleteWishlist,
  editWishlist,
} from "../EditWishlist/EditWishlistHelpers";

export const useManageMyWishlist = (navigate: NavigateFunction) => {
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
  const [openWishEdition, setOpenWishEdition] = useState(false);
  const [wishToEdit, setWishToEdit] = useState<Wish | null>(null);
  const [openWishlistEdition, setOpenWishlistEdition] = useState(false);
  const [wishlistToEdit, setWishlistToEdit] = useState<Wishlist | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [wishToDelete, setWishToDelete] = useState<Wish | null>(null);
  const [wishlistToDelete, setWishlistToDelete] = useState<Wishlist | null>(
    null
  );
  const [optionsWishId, setOptionsWishId] = useState<string | null>(null);

  const [wishTitle, setWishTitle] = useState("");
  const [wishDescription, setWishDescription] = useState("");
  const [wishPicture, setWishPicture] = useState<File | null>(null);
  const [wishPicturePreview, setWishPicturePreview] = useState<string | null>(
    null
  );
  const [wishPrice, setWishPrice] = useState("");
  const [wishLink, setWishLink] = useState("");
  const [url, setUrl] = useState("");
  const [wishlistTitle, setWishlistTitle] = useState("");
  const [wishlistDescription, setWishlistDescription] = useState("");
  const [wishlistPicture, setWishlistPicture] = useState<File | null>(null);
  const [wishlistPicturePreview, setWishlistPicturePreview] = useState<
    string | null
  >(null);
  const [wishlistAccess, setWishlistAccess] = useState("public");
  const [wishlistPublished, setWishlistPublished] = useState("1");
  const [wishlistMode, setWishlistMode] = useState("individual");
  const [wishlistParticipants, setWishlistParticipants] = useState<User[]>([]);

  const [wishlistIsSubmitting, setWishlistIsSubmitting] = useState(false);
  const [wishlistSubmitError, setWishlistSubmitError] = useState<string | null>(
    null
  );

  const [wishIsSubmitting, setWishIsSubmitting] = useState(false);
  const [wishSubmitError, setWishSubmitError] = useState<string | null>(null);
  const [isSubmittingScrapping, setIsSubmittingScrapping] = useState(false);
  const [submitErrorScrapping, setSubmitErrorScrapping] = useState<
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
    setWishlistMode(wishlistToEdit.mode ? "collective" : "individual");
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
      setShowCreate(false);
      navigate(`/wishlist/${id}`);
    },
    onError: (error: Error) =>
      setWishSubmitError(error.message || "Erreur inconnue"),
    onSettled: () => setWishIsSubmitting(false),
  });

  const scrapMutation = useMutation({
    mutationFn: scrapWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes", id] });
      setUrl("");
      setCreationMode("none");
    },
    onError: (error: Error) =>
      setSubmitErrorScrapping(error.message || "Erreur inconnue"),
    onSettled: () => setIsSubmittingScrapping(false),
  });

  const editMutation = useMutation({
    mutationFn: editWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
      resetWishForm();
      setOpenWishEdition(false);
      setWishToEdit(null);
    },
    onError: (error: Error) =>
      setWishSubmitError(error.message || "Erreur inconnue"),
    onSettled: () => setWishIsSubmitting(false),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
      resetWishForm();
      setOpenWishEdition(false);
      setWishToEdit(null);
    },
    onError: (error: Error) =>
      setWishSubmitError(error.message || "Erreur inconnue"),
  });

  const editWishlistMutation = useMutation({
    mutationFn: editWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      if (id) queryClient.invalidateQueries({ queryKey: ["wishlist", id] });
      setOpenWishlistEdition(false);
      setWishlistToEdit(null);
      resetWishlistForm();
    },
    onError: (error: Error) =>
      setWishlistSubmitError(error.message || "Erreur inconnue"),
    onSettled: () => setWishlistIsSubmitting(false),
  });

  const deleteWishlistMutation = useMutation({
    mutationFn: deleteWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      setWishlistToDelete(null);
      setShowConfirm(false);
      navigate("/my-wishlists"); // ou autre route après suppression
    },
    onError: (error: Error) =>
      setWishlistSubmitError(error.message || "Erreur inconnue"),
  });

  // =======================
  // Handlers
  // =======================
  const handleWishPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setWishPicture(file);
  };

  const handleWishlistPictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    setWishlistPicture(file);
  };

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleScrappingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingScrapping(true);
    setSubmitErrorScrapping(null);

    scrapMutation.mutate({
      url,
      wishlistId: id ?? "",
    });
  };

  const handleWishEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleWishlistDeleteSubmit = () => {
    if (!wishlistToDelete) return;
    deleteWishlistMutation.mutate(wishlistToDelete.id);
  };

  const handleWishlistEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wishlistToEdit) return;

    setWishlistIsSubmitting(true);
    setWishlistSubmitError(null);

    editWishlistMutation.mutate(wishlistToEdit.id);
  };

  const handleWishDeleteButton = (wish: Wish) => {
    if (window.confirm("Souhaitez-vous vraiment supprimer ce souhait ?")) {
      deleteMutation.mutate(wish.id);
    }
  };

  // =======================
  // Helpers
  // =======================
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
    setShowConfirm(true);
  };

  const confirmWishlistDelete = (wishlist: Wishlist) => {
    setWishlistToDelete(wishlist);
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
    openWishEdition,
    wishToEdit,
    showConfirm,
    wishToDelete,
    wishlistToDelete,
    optionsWishId,

    // Form fields
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

    // Status
    loading,
    error,
    loadingWishes,
    loadingWishlist,
    wishIsSubmitting,
    wishSubmitError,
    isSubmittingScrapping,
    submitErrorScrapping,

    // Handlers
    handleCreateSubmit,
    handleScrappingSubmit,
    handleWishEditSubmit,
    handleWishDeleteButton,
    handleWishPictureChange,
    confirmWishDelete,
    confirmWishlistDelete,
    openWishEditForm,
    closeWishEditForm,
    toggleOptions,
    closeOptions,
    setWishToDelete,
    setWishlistToDelete,
    setShowConfirm,
    setOptionsWishId,
    openWishlistEditForm,
    openWishlistEdition,
    wishlistToEdit,
    closeWishlistEditForm,
    handleWishlistEditSubmit,
    wishlistTitle,
    setWishlistTitle,
    handleWishlistPictureChange,
    wishlistDescription,
    setWishlistDescription,
    wishlistPicturePreview,
    wishlistAccess,
    setWishlistAccess,
    wishlistPublished,
    setWishlistPublished,
    wishlistSubmitError,
    wishlistIsSubmitting,
    wishlistMode,
    setWishlistMode,
    wishlistParticipants,
    setWishlistParticipants,
    handleWishlistDeleteSubmit,
  };
};

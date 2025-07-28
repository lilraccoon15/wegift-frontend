import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useMyWishById } from "../MyWishes/MyWishesHelpers";
import { deleteWish, editWish } from "../EditWish/EditWishHelpers";

export const useManageMyWish = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: wish, isLoading: loading, error } = useMyWishById(id ?? "");

  // === Suppression
  const [showConfirm, setShowConfirm] = useState(false);
  const [wishToDelete, setWishToDelete] = useState<typeof wish | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
      navigate(-1);
    },
    onError: (error: Error) => {
      alert("Erreur lors de la suppression : " + error.message);
    },
  });

  const handleDelete = () => {
    if (!wishToDelete) return;
    deleteMutation.mutate(wishToDelete.id);
    setShowConfirm(false);
    setWishToDelete(null);
  };

  // === Édition
  const [openEditModal, setOpenEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [errorEdit, setErrorEdit] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("available");

  const editMutation = useMutation({
    mutationFn: editWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
      setOpenEditModal(false);
    },
    onError: (error: Error) => {
      setErrorEdit(error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish) return;

    setIsSubmitting(true);
    setErrorEdit(null);

    editMutation.mutate({
      id: wish.id,
      title,
      description: description || undefined,
      price: price ? Number(price) : undefined,
      link: link || undefined,
      picture: picture || undefined,
      status,
    });
  };

  const handlePictureChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    setPicture(file);
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus(e.target.value as "available" | "reserved");
  };

  useEffect(() => {
    if (wish) {
      setTitle(wish.title || "");
      setDescription(wish.description || "");
      setPrice(wish.price ? String(wish.price) : "");
      setLink(wish.link || "");
      setPicturePreview(wish.picture || null);
      setStatus(wish.status || "available");
    }
  }, [wish]);

  useEffect(() => {
    if (!picture) return;
    const objectUrl = URL.createObjectURL(picture);
    setPicturePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [picture]);

  return {
    id,
    wish,
    loading,
    error,

    // Suppression
    showConfirm,
    setShowConfirm,
    wishToDelete,
    setWishToDelete,
    handleDelete,

    // Édition
    openEditModal,
    setOpenEditModal,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    link,
    setLink,
    picture,
    setPicture,
    picturePreview,
    handlePictureChange,
    handleEditSubmit,
    errorEdit,
    isSubmitting,
    status,
    setStatus,
    handleStatusChange,
  };
};

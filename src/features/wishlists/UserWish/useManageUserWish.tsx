import { useParams } from "react-router-dom";
import { useWishById } from "../UserWishes/UserWishesHelpers";
import { useState } from "react";
import { cancelReservation, reserveWish } from "./UserWishHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useManageWish = () => {
  const { id } = useParams<{ id: string }>();

  const { data: wish, isLoading: loading, error } = useWishById(id ?? "");

  const queryClient = useQueryClient();

  const [showReservationOptions, setShowReservationOptions] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const mutation = useMutation({
    mutationFn: reserveWish,
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["wish", id] });
      }
      setShowReservationOptions(false);
      alert("Souhait réservé !");
    },
    onError: (error: Error) => {
      alert("Une erreur est survenue : " + error.message);
    },
  });

  const handleConfirmReserve = () => {
    if (!id) return;
    mutation.mutate({ wishId: id, isAnonymous: true });
  };

  const cancelMutation = useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["wish", id] });
      }
      alert("Réservation annulée.");
    },
    onError: (error: Error) => {
      alert("Erreur lors de l’annulation : " + error.message);
    },
  });

  const handleCancelReservation = () => {
    if (!id) return;
    cancelMutation.mutate({ wishId: id });
  };

  return {
    id,
    wish,
    loading,
    error,
    showReservationOptions,
    setShowReservationOptions,
    isAnonymous,
    setIsAnonymous,
    handleConfirmReserve,
    handleCancelReservation,
  };
};

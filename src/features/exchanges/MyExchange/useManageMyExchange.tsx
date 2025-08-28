import { useParams } from "react-router-dom";
import { useMyExchangeById } from "../MyExchanges/MyExchangesHelpers";
import {
  cancelExchangeDrawById,
  drawExchangeById,
  useParticipantsProfiles,
} from "./MyExchangeHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCombinedState } from "../../../hooks/useCombineState";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export const useManageMyExchange = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading: loadingExchange,
    isFetching: isFetchingExchange,
    error: errorExchange,
  } = useMyExchangeById(id ?? "");

  const exchange = data?.data?.exchange;
  const userIds = exchange?.participants?.map((p) => p.userId) ?? [];

  const { data: profiles = {}, isLoading: loadingProfiles } =
    useParticipantsProfiles(userIds);

  const { user: currentUser } = useAuth();

  const queryClient = useQueryClient();
  const [showAssignment, setShowAssignment] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const hasBeenDrawn = (exchange?.assigned?.length ?? 0) > 0;

  const isOwner = exchange?.userId === currentUser?.id;
  const hasStarted =
    exchange?.startDate && new Date(exchange.startDate) <= new Date();

  const {
    mutate: drawExchange,
    isPending: isDrawing,
    error: drawError,
  } = useMutation({
    mutationFn: () => drawExchangeById(id!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exchange", id] });
    },
  });

  const {
    mutate: cancelDrawExchange,
    isPending: isCancelling,
    error: cancelError,
  } = useMutation({
    mutationFn: () => cancelExchangeDrawById(id!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exchange", id] });
      setConfirmCancelOpen(false);
    },
  });

  const handleCancelDraw = () => {
    if (!id || !exchange) return;
    cancelDrawExchange();
  };

  const handleDrawExchange = () => {
    if (!id) return;
    drawExchange();
  };

  const { loading, error } = useCombinedState([
    { loading: loadingExchange || isFetchingExchange, error: errorExchange },
    { loading: isDrawing, error: drawError },
    { loading: isCancelling, error: cancelError },
    { loading: loadingProfiles },
  ]);

  return {
    exchange,
    loading,
    error,
    handleDrawExchange,
    isOwner,
    hasBeenDrawn,
    showAssignment,
    setShowAssignment,
    profiles,
    currentUser,
    confirmCancelOpen,
    setConfirmCancelOpen,
    hasStarted,
    handleCancelDraw,
  };
};

export default useManageMyExchange;

import { useParams } from "react-router-dom";
import {
  askFriend,
  useFriendshipStatus,
  useProfile,
  type FriendshipStatus,
} from "./ViewProfileHelpers";
import { useMyProfile } from "../MyProfile/MyProfileHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useManageViewProfile = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: user, error, isLoading: loading } = useProfile(id!);
  const { data: currentUser } = useMyProfile();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const shouldCheck = !!currentUser?.id && !!user?.id;

  const { data: friendshipData } = useFriendshipStatus(
    currentUser?.id ?? "",
    user?.id ?? "",
    shouldCheck
  );

  const status: FriendshipStatus = friendshipData?.status ?? "none";

  const mutation = useMutation({
    mutationFn: ({
      requesterId,
      addresseeId,
    }: {
      requesterId: string;
      addresseeId: string;
    }) => askFriend(requesterId, addresseeId),
    onSuccess: () => {
      queryClient.setQueryData(
        ["friendshipStatus", currentUser?.id, user?.id],
        { status: "pending_sent" }
      );
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Erreur inconnue");
      }
    },
    onSettled: () => setIsSubmitting(false),
  });

  const handleAddFriend = () => {
    if (!currentUser?.id || !user?.id) return;
    setIsSubmitting(true);
    setSubmitError(null);
    mutation.mutate({ requesterId: currentUser.id, addresseeId: user.id });
  };

  return {
    loading,
    error,
    currentUser,
    user,
    friendshipStatus: status,
    handleAddFriend,
    isSubmitting,
    submitError,
  };
};

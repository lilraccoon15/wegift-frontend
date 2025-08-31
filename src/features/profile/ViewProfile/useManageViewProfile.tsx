import { useParams } from "react-router-dom";
import {
    askFriend,
    cancelFriendRequest,
    removeFriend,
    respondToFriendRequest,
    useFriends,
    useFriendshipStatus,
    useProfile,
    type FriendshipStatus,
} from "./ViewProfileHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useWishlists } from "../../wishlists/UserWishlists/UserWishlistsHelpers";
import { useCombinedState } from "../../../hooks/useCombineState";
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../../config/constants";
import { useAuth } from "../../../context/AuthContext";

export const useManageViewProfile = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();

    // ==== Data Fetching ====
    const {
        data: user,
        error: errorUser,
        isLoading: loadingUser,
    } = useProfile(id!);
    const { user: currentUser } = useAuth();

    const {
        data: friends,
        error: friendsError,
        isLoading: loadingFriends,
    } = useFriends(user?.id);

    const {
        data: wishlists,
        error: errorWishlists,
        isLoading: loadingWishlists,
    } = useWishlists(user?.id);

    const shouldCheck = !!currentUser?.id && !!user?.id;

    const { data: friendshipData } = useFriendshipStatus(
        currentUser?.id ?? "",
        user?.id ?? "",
        shouldCheck
    );

    const friendshipStatus: FriendshipStatus = friendshipData?.status ?? "none";

    const BACKEND_URL = BACKEND_URLS.user;
    const DEFAULT_PICTURE_URL = DEFAULT_PICTURES.user;

    const { loading, error } = useCombinedState([
        { loading: loadingUser, error: errorUser },
        { loading: loadingFriends, error: friendsError },
        { loading: loadingWishlists, error: errorWishlists },
    ]);

    // ==== State ====
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showActionsMenu, setShowActionsMenu] = useState(false);
    const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);

    // ==== Mutations ====
    const askFriendMutation = useMutation({
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
            setSubmitError(
                error instanceof Error ? error.message : "Erreur inconnue"
            );
        },
        onSettled: () => setIsSubmitting(false),
    });

    const cancelFriendMutation = useMutation({
        mutationFn: (addresseeId: string) => cancelFriendRequest(addresseeId),
        onSuccess: () => {
            queryClient.setQueryData(
                ["friendshipStatus", currentUser?.id, user?.id],
                { status: "none" }
            );
        },
        onError: (error: unknown) => {
            setSubmitError(
                error instanceof Error ? error.message : "Erreur inconnue"
            );
        },
        onSettled: () => setIsSubmitting(false),
    });

    const acceptFriendMutation = useMutation({
        mutationFn: () => respondToFriendRequest(user?.id ?? "", "accept"),
        onSuccess: () => {
            queryClient.setQueryData(
                ["friendshipStatus", currentUser?.id, user?.id],
                { status: "accepted" }
            );
        },
        onError: (error: unknown) => {
            setSubmitError(
                error instanceof Error ? error.message : "Erreur inconnue"
            );
        },
        onSettled: () => setIsSubmitting(false),
    });

    const declineFriendMutation = useMutation({
        mutationFn: () => respondToFriendRequest(user?.id ?? "", "reject"),
        onSuccess: () => {
            queryClient.setQueryData(
                ["friendshipStatus", currentUser?.id, user?.id],
                { status: "rejected" }
            );
        },
        onError: (error: unknown) => {
            setSubmitError(
                error instanceof Error ? error.message : "Erreur inconnue"
            );
        },
        onSettled: () => setIsSubmitting(false),
    });

    const removeFriendMutation = useMutation({
        mutationFn: () => removeFriend(user?.id ?? ""),
        onSuccess: () => {
            queryClient.setQueryData(
                ["friendshipStatus", currentUser?.id, user?.id],
                { status: "none" }
            );
            queryClient.invalidateQueries({
                queryKey: ["userFriends", currentUser?.id],
            });
            setShowRemoveFriendModal(false);
        },
        onError: (error: unknown) => {
            setSubmitError(
                error instanceof Error ? error.message : "Erreur inconnue"
            );
        },
        onSettled: () => setIsSubmitting(false),
    });

    // ==== Handlers ====
    const handleAddFriend = () => {
        if (!currentUser?.id || !user?.id) return;
        setIsSubmitting(true);
        setSubmitError(null);
        askFriendMutation.mutate({
            requesterId: currentUser.id,
            addresseeId: user.id,
        });
    };

    const handleCancelFriendRequest = () => {
        if (!user?.id) return;
        setIsSubmitting(true);
        setSubmitError(null);
        cancelFriendMutation.mutate(user.id);
    };

    const handleAcceptFriendRequest = () => {
        setIsSubmitting(true);
        setSubmitError(null);
        acceptFriendMutation.mutate();
    };

    const handleDeclineFriendRequest = () => {
        setIsSubmitting(true);
        setSubmitError(null);
        declineFriendMutation.mutate();
    };

    const handleRemoveFriend = () => {
        setIsSubmitting(true);
        setSubmitError(null);
        setShowActionsMenu(false);
        removeFriendMutation.mutate();
    };

    // ==== Return ====
    return {
        loading,
        error,
        currentUser,
        user,
        friends,
        wishlists,
        BACKEND_URL,
        DEFAULT_PICTURE_URL,
        friendshipStatus,
        setShowActionsMenu,
        showActionsMenu,
        isSubmitting,
        submitError,
        handleAddFriend,
        handleCancelFriendRequest,
        handleAcceptFriendRequest,
        handleDeclineFriendRequest,
        handleRemoveFriend,
        showRemoveFriendModal,
    };
};

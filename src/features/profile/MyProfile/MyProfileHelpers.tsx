import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";
import { useAuth } from "../../../context/AuthContext";

export interface User {
  id: string;
  pseudo: string;
  birthDate: string;
  picture: string;
  description: string;
}

export interface PendingFriend {
  profile: {
    id: string;
    pseudo: string;
    picture?: string | null;
  };
  direction: "sent" | "received";
}

// 🔹 Plus besoin d'appeler l'API, on prend les données du contexte
export function useMyProfile() {
  const { user } = useAuth();
  return user;
}

export function useMyFriends() {
  return useQuery<User[], Error>({
    queryKey: ["myFriends"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/users/my-friends`, {
        withCredentials: true,
      });
      return res.data.data.friendships ?? [];
    },
  });
}

export function useMyPendingFriends() {
  return useQuery<PendingFriend[], Error>({
    queryKey: ["myPendingFriends"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/users/my-pending-friends`, {
        withCredentials: true,
      });
      return res.data.data.pendings ?? [];
    },
  });
}

export function useCancelFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(`${API_URL}/api/users/friendship/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPendingFriends"] });
    },
  });
}

export function useDeleteFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(`${API_URL}/api/users/delete-friend/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myFriends"] });
    },
  });
}

export function useRespondToFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      requesterId,
      action,
    }: {
      requesterId: string;
      action: "accept" | "reject";
    }) => {
      const res = await axios.patch(
        `${API_URL}/api/users/friends/${requesterId}/respond`,
        { action },
        { withCredentials: true }
      );

      if (!res.data?.success) {
        throw new Error("Erreur lors du traitement de la demande d'ami");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPendingFriends"] });
      queryClient.invalidateQueries({ queryKey: ["myFriends"] });
    },
  });
}

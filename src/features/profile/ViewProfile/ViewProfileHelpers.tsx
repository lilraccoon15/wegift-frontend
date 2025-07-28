import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface User {
  id: string;
  pseudo: string;
  birthDate: string;
  picture: string;
  description: string;
}

export type FriendshipStatus =
  | "none"
  | "pending_sent"
  | "pending_received"
  | "friends"
  | "accepted"
  | "rejected"
  | "unknown";

export async function fetchProfile(id: string) {
  const res = await axios.get(`${API_URL}/api/users/profile/${id}`, {
    withCredentials: true,
  });
  return res.data.data.profile ?? null;
}

export function useProfile(id: string) {
  return useQuery<User | null, Error>({
    queryKey: ["userProfile", id],
    queryFn: () => fetchProfile(id),
    enabled: !!id,
  });
}

export function useFriends(userId?: string) {
  return useQuery<User[], Error>({
    queryKey: ["userFriends", userId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/users/friends/${userId}`, {
        withCredentials: true,
      });
      return res.data.data.friendships ?? [];
    },
    enabled: !!userId,
  });
}

export function useAreFriends(
  userId1: string,
  userId2: string,
  enabled: boolean
) {
  return useQuery<boolean>({
    queryKey: ["areFriends", userId1, userId2],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/users/friendship-status`, {
        params: { user1: userId1, user2: userId2, mode: "simple" },
        withCredentials: true,
      });
      return res.data.data.areFriends ?? false;
    },
    enabled,
  });
}

export async function askFriend(
  requesterId: string,
  addresseeId: string
): Promise<"pending_sent"> {
  const res = await axios.post(
    `${API_URL}/api/users/ask-friend`,
    { requesterId, addresseeId },
    { withCredentials: true }
  );
  if (res.data?.success) {
    return "pending_sent";
  }

  throw new Error("Erreur lors de la demande d'ami");
}

export function useFriendshipStatus(
  userId1: string,
  userId2: string,
  enabled: boolean
) {
  return useQuery<{ status: FriendshipStatus }>({
    queryKey: ["friendshipStatus", userId1, userId2],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/users/friendship-status`, {
        params: { user1: userId1, user2: userId2 },
        withCredentials: true,
      });
      return res.data.data ?? { status: "unknown" };
    },
    enabled,
  });
}

export async function cancelFriendRequest(
  addresseeId: string
): Promise<"none"> {
  const res = await axios.delete(`${API_URL}/api/users/delete-friend-request`, {
    data: { addresseeId },
    withCredentials: true,
  });

  if (res.data?.success) {
    return "none";
  }

  throw new Error("Erreur lors de l'annulation de la demande d'ami");
}

export async function respondToFriendRequest(
  requesterId: string,
  action: "accept" | "reject"
): Promise<"accepted" | "rejected"> {
  const res = await axios.patch(
    `${API_URL}/api/users/friends/${requesterId}/respond`,
    { action },
    { withCredentials: true }
  );

  if (res.data?.success) {
    return action === "accept" ? "accepted" : "rejected";
  }

  throw new Error("Erreur lors du traitement de la demande d'ami");
}

export async function removeFriend(friendId: string): Promise<"none"> {
  const res = await axios.delete(
    `${API_URL}/api/users/delete-friend/${friendId}`,
    {
      withCredentials: true,
    }
  );

  if (res.data?.success) {
    return "none";
  }

  throw new Error("Erreur lors de la suppression de l’ami");
}

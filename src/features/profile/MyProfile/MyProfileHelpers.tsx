import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface User {
  id: string;
  pseudo: string;
  birthDate: string;
  picture: string;
  description: string;
  isPublic: boolean;
}

export interface PendingFriend {
  profile: {
    id: string;
    pseudo: string;
    picture?: string | null;
  };
  direction: "sent" | "received";
}

export function useMyProfile() {
  return useQuery<User | null, Error>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/users/my-profile`, {
        withCredentials: true,
      });
      return res.data.data.profile ?? null;
    },
  });
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
      await axios.delete(`${API_URL}/api/friendship/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPendingFriends"] });
    },
  });
}

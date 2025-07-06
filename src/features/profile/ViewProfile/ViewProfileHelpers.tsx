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

export function useProfile(id: string) {
    return useQuery<User | null, Error>({
        queryKey: ["userProfile", id],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/api/users/profile/${id}`, {
                withCredentials: true,
            });
            return res.data.data.user ?? null;
        },
        enabled: !!id,
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
            const res = await axios.get(
                `${API_URL}/api/users/friendship-status`,
                {
                    params: { user1: userId1, user2: userId2, mode: "simple" },
                    withCredentials: true,
                }
            );
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
            const res = await axios.get(
                `${API_URL}/api/users/friendship-status`,
                {
                    params: { user1: userId1, user2: userId2 },
                    withCredentials: true,
                }
            );
            return res.data.data ?? { status: "unknown" };
        },
        enabled,
    });
}

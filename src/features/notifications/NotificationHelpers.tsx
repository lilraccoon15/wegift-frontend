import axios from "axios";
import API_URL from "../../config";
import { useQuery } from "@tanstack/react-query";

export interface NotificationType {
    text: string;
}

export interface Notification {
    id: string;
    userId: string;
    notificationTypeId: string;
    data: any;
    read: boolean;
    createdAt: string;
    updatedAt: string;
    type?: NotificationType;
}

export function useMyNotifications(userId?: string, options = {}) {
    return useQuery<Notification[], Error>({
        queryKey: ["myNotifications", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID is required");
            const rest = await axios.get(
                `${API_URL}/api/notification/get-notifications?userId=${userId}`,
                {
                    withCredentials: true,
                }
            );
            return rest.data.data.notifications ?? [];
        },
        enabled: !!userId,
        ...options,
    });
}

export async function markNotificationsAsRead(userId: string) {
    const res = await fetch(
        `${API_URL}/api/notification/mark-as-read?userId=${userId}`,
        {
            method: "PUT",
            credentials: "include",
        }
    );
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour");
    }
    return true;
}

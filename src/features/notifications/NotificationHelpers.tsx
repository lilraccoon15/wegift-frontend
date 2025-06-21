import axios from "axios";
import API_URL from "../../config";
import { useQuery } from "@tanstack/react-query";

export interface Notification {
    id: number;
    text: string;
    read: boolean;
    createdAt?: string;
}

export function useMyNotifications() {
    return useQuery<Notification[], Error>({
        queryKey: ["myNotifications"],
        queryFn: async () => {
            const rest = await axios.get(
                `${API_URL}/api/notification/get-notifications`,
                {
                    withCredentials: true,
                }
            );
            return rest.data.data.notifications;
        },
    });
}



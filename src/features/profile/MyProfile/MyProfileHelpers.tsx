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

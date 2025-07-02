import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../config";

export interface Account {
    id: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
    newsletter: boolean;
    twoFactorEnabled: boolean;
}

export function useMyAccount() {
    return useQuery<Account | null, Error>({
        queryKey: ["myAccount"],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/api/auth/get-account`, {
                withCredentials: true,
            });
            return res.data.data.account ?? null;
        },
    });
}

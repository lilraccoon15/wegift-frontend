import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Account {
    id: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
    newsletter: boolean;
    twoFactorEnabled: boolean;
}

export function useMyAccount() {
    return useQuery<Account, Error>({
        queryKey: ["myAccount"], 
        queryFn: async () => {
            const res = await axios.get("http://localhost:4000/api/auth/get-account", {
                withCredentials: true,
            });
            return res.data.data.account;
        }
    })
}
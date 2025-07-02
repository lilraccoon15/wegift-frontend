import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface Exchange {
    id: string;
    title: string;
    picture: string;
    description: string;
    userId: string;
    status: string;
    participantCount?: number;
}

export function useMyExchanges() {
    return useQuery<Exchange[], Error>({
        queryKey: ["myExchanges"],
        queryFn: async () => {
            const res = await axios.get(
                `${API_URL}/api/exchange/my-exchanges`,
                {
                    withCredentials: true,
                }
            );
            return res.data.data.exchanges ?? [];
        },
    });
}

// export function useMyExchangeById(id: string) {
//     return useQuery({
//         queryKey: ["exchange", id],
//         queryFn: async () => {
//             const res = await axios.get(
//                 `${API_URL}/api/exchange/my-exchange/${id}`,
//                 {
//                     withCredentials: true,
//                 }
//             );
//             return res.data;
//         },
//         enabled: !!id,
//     });
// }

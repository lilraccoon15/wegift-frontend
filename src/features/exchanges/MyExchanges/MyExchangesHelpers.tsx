import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";
import type { Rule } from "../CreateExchange/CreateExchangeHelpers";

export interface Participant {
    id: string;
    userId: string;
    acceptedAt: string | null;
}

export interface Assignment {
    id: string;
    userId: string;
    assignedUserId: string;
}

export interface AssignmentDisplay {
    targetName: string;
}

export interface Exchange {
    id: string;
    title: string;
    picture: string;
    description: string;
    userId: string;
    startDate?: string;
    endDate?: string;
    participantsCount?: number;
    participants?: Participant[];
    assigned?: Assignment[];
    assignment?: AssignmentDisplay;
    rules?: Rule[];
    budget?: string;
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

export function useMyExchangeById(id: string) {
    return useQuery<{ data: { exchange: Exchange } }, Error>({
        queryKey: ["exchange", id],
        queryFn: async () => {
            const res = await axios.get(
                `${API_URL}/api/exchange/my-exchange/${id}`,
                {
                    withCredentials: true,
                }
            );
            return res.data;
        },
        enabled: !!id,
    });
}

export async function respondToExchangeInvite(
    requesterId: string,
    action: "accept" | "reject"
) {
    const res = await axios.patch(
        `${API_URL}/api/exchange/${requesterId}/respond`,
        { action },
        { withCredentials: true }
    );

    return res.data;
}

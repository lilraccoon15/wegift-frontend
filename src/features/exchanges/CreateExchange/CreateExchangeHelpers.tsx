import API_URL from "../../../config";
import type { Exchange } from "../MyExchanges/MyExchangesHelpers";

interface CreatePayload {
    title: string;
    description?: string;
    picture?: File;
    participantIds: string[];
    rules: string[];
    startDate: string;
    endDate: string;
    budget?: number;
}

export interface Rule {
    id: string;
    title: string;
    description?: string;
}

export async function createExchange(data: CreatePayload): Promise<Exchange> {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    if (data.description !== undefined) {
        formData.append("description", data.description);
    }

    if (data.picture) {
        formData.append("picture", data.picture);
    }

    data.participantIds.forEach((id) =>
        formData.append("participantIds[]", id)
    );

    data.rules.forEach((id) => formData.append("rules[]", id));

    if (data.budget !== undefined) {
        formData.append("budget", data.budget.toString());
    }

    const response = await fetch(`${API_URL}/api/exchange/create-exchange`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la création");
    }

    const result = await response.json();
    return result.data.exchange;
}

export async function fetchRules(): Promise<Rule[]> {
    const response = await fetch(`${API_URL}/api/exchange/get-rules`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(
            error.message || "Erreur lors du chargement des règles"
        );
    }

    const result = await response.json();

    return result.data.rules || [];
}

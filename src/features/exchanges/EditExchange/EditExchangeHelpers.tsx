import API_URL from "../../../config";
import type { Exchange } from "../MyExchanges/MyExchangesHelpers";

interface EditPayload {
    id: string;
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

export async function editExchange(data: EditPayload): Promise<Exchange> {
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

    const response = await fetch(
        `${API_URL}/api/exchange/update-exchange/${data.id}`,
        {
            method: "PUT",
            credentials: "include",
            body: formData,
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la modification");
    }

    const result = await response.json();
    return result.data.exchange;
}

export async function deleteExchange(id: string) {
    const response = await fetch(
        `${API_URL}/api/exchange/delete-exchange/${id}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
    }
}

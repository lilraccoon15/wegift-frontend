import API_URL from "../../../config";
import type { Exchange } from "../MyExchanges/MyExchangesHelpers";

interface CreatePayload {
    title: string;
    description?: string;
    picture?: File;
}

export async function createExchange(data: CreatePayload): Promise<Exchange> {
    const formData = new FormData();
    formData.append("title", data.title);

    if (data.description !== undefined) {
        formData.append("description", data.description);
    }

    if (data.picture) {
        formData.append("picture", data.picture);
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

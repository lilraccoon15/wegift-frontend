import API_URL from "../../../config";

export interface RegisterResponse {
    success?: boolean;
    message?: string;
    error?: string;
}

export async function registerUser(data: {
    pseudo: string;
    birthDate: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
    newsletter: boolean;
}): Promise<RegisterResponse> {
    try {
        const res = await await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: result.message || "Erreur inconnue",
            };
        }

        return { success: true, message: result.message };
    } catch (err) {
        return {
            success: false,
            error: "Erreur réseau ou serveur indisponible.",
        };
    }
}

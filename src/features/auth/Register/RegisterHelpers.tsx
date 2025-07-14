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

export async function checkEmailAvailability(email: string): Promise<boolean> {
    try {
        const res = await fetch(
            `${API_URL}/api/auth/check-email?email=${email}`,
            {
                credentials: "include",
            }
        );

        const result = await res.json();
        return result.data?.available === true;
    } catch {
        return false;
    }
}

export async function checkPseudoAvailability(
    pseudo: string
): Promise<boolean> {
    try {
        const res = await fetch(
            `${API_URL}/api/users/check-pseudo?pseudo=${pseudo}`,
            {
                credentials: "include",
            }
        );

        const result = await res.json();
        return result.data?.available === true;
    } catch {
        return false;
    }
}

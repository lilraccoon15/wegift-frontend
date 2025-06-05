export interface LoginResponse {
    error?: string;
    requires2FA?: boolean;
    token?: string;
    tempToken?: string;
    success?: boolean;
    message?: string;
}

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    try {
        const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.message || "Erreur inconnue" };
        }

        const data = await res.json();

        if (data.requires2FA) {
            return { requires2FA: true, tempToken: data.tempToken };
        }

        return {
            token: data.token,
            success: data.success,
            message: data.message,
        };
    } catch (error) {
        return { error: "Erreur réseau, veuillez réessayer." };
    }
}

export async function verify2FACode(
    code: string,
    tempToken: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch("http://localhost:4000/api/auth/verify-2fa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tempToken}`,
            },
            body: JSON.stringify({ code }),
            credentials: "include",
        });

        if (!res.ok) return { success: false, error: "Code 2FA invalide" };

        const data = await res.json();
        const token = data.data.token;

        const meRes = await fetch("http://localhost:4000/api/users/me", {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (meRes.ok) {
            return { success: true };
        }

        return { success: false, error: "Erreur lors de la validation 2FA" };
    } catch {
        return {
            success: false,
            error: "Erreur réseau lors de la validation 2FA",
        };
    }
}

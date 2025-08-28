import API_URL from "../../../config";

export interface LoginResponse {
  error?: string;
  requires2FA?: boolean;
  tempToken?: string;
  success?: boolean;
  message?: string;
}

export async function login(
  email: string,
  password: string,
  remember: boolean
): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, remember }),
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

    return { success: true, message: data.message };
  } catch {
    return { error: "Erreur réseau, veuillez réessayer." };
  }
}

export async function verify2FACode(
  code: string,
  tempToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/verify-2fa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tempToken}`,
      },
      body: JSON.stringify({ code }),
      credentials: "include",
    });

    if (!res.ok) {
      return { success: false, error: "Code 2FA invalide" };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Erreur réseau lors de la validation 2FA",
    };
  }
}

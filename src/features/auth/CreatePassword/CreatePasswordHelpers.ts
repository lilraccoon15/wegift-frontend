const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const createPassword = async (
  password: string
): Promise<{ ok: boolean }> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/create-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("Erreur lors de la création du mot de passe :", error);
    return { ok: false };
  }
};

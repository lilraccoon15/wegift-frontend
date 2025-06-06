import type { Account } from "../MyAccountHelpers";

interface UpdatePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export async function updatePassword(
    data: UpdatePasswordPayload
): Promise<Account> {
    const response = await fetch(
        "http://localhost:4000/api/auth/update-password",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour");
    }
    const updatedAccount: Account = await response.json();
    return updatedAccount;
}

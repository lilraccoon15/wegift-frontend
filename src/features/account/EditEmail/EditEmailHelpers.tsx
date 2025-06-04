import type { Account } from "../MyAccountHelpers";

interface UpdateEmailPayload {
    email: string;
    password: string;
}

export async function updateEmail(data: UpdateEmailPayload): Promise<Account> {
    const response = await fetch("http://localhost:4000/api/auth/update-email", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour");
    }

    const updatedAccount: Account = await response.json();
    return updatedAccount;
}
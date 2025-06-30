import API_URL from "../../../config";
import type { Account } from "../MyAccountHelpers";

interface DeleteAccountPayload {
    password: string;
}

export async function deleteAccount(
    data: DeleteAccountPayload
): Promise<Account> {
    const response = await fetch(`${API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || "Erreur lors de la suppression du compte."
        );
    }

    const deleteAccount: Account = await response.json();
    return deleteAccount;
}

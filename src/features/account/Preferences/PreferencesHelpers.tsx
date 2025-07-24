import API_URL from "../../../config";
import type { Account } from "../MyAccountHelpers";

interface updateNewsletterPayload {
  newsletter: boolean;
}

export async function updateNewsletter(
  data: updateNewsletterPayload
): Promise<Account> {
  const response = await fetch(`${API_URL}/api/auth/update-newsletter`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la mise à jour");
  }

  const updatedAccount: Account = await response.json();
  return updatedAccount;
}

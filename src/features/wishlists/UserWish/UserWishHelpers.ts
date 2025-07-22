import API_URL from "../../../config";

export const reserveWish = async ({
  wishId,
  isAnonymous,
}: {
  wishId: string;
  isAnonymous: boolean;
}): Promise<void> => {
  const response = await fetch(`${API_URL}/api/wishlist/reserve/${wishId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isAnonymous }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la réservation");
  }
};

export const cancelReservation = async ({
  wishId,
}: {
  wishId: string;
}): Promise<void> => {
  const response = await fetch(
    `${API_URL}/api/wishlist/cancel-reserve/${wishId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de l'annulation");
  }
};

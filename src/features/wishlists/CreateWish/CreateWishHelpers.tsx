import API_URL from "../../../config";
import type { Wish } from "../MyWishes/MyWishesHelpers";

interface Createpayload {
  title: string;
  wishlistId: string;
  status: string;
  price?: number;
  description?: string;
  picture?: File;
  link?: string;
}

export async function createWish(data: Createpayload): Promise<Wish> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("wishlistId", data.wishlistId);
  formData.append("status", data.status);

  if (data.price !== undefined) {
    formData.append("price", String(data.price));
  }

  if (data.link !== undefined) {
    formData.append("link", data.link);
  }

  if (data.description !== undefined) {
    formData.append("description", data.description);
  }

  if (data.picture) {
    formData.append("picture", data.picture);
  }

  const response = await fetch(`${API_URL}/api/wishlist/create-wish`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la création");
  }

  const result = await response.json();
  return result.data.wish;
}

export const scrapWish = async ({
  url,
  wishlistId,
}: {
  url: string;
  wishlistId: string;
}) => {
  const res = await fetch(`${API_URL}/api/wishlist/scrap-wish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, wishlistId }),
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Erreur lors de l'import du souhait");
  }

  return res.json();
};

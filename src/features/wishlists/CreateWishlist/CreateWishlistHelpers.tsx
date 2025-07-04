import API_URL from "../../../config";
import type { Wishlist } from "../MyWishlists/MyWishlistsHelpers";

interface CreatePayload {
    title: string;
    description?: string;
    picture?: File;
    access: string;
    mode: string;
    participantIds: string[];
}

export async function createWishlist(data: CreatePayload): Promise<Wishlist> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("access", data.access);
    formData.append("mode", data.mode);

    if (data.description !== undefined) {
        formData.append("description", data.description);
    }

    if (data.picture) {
        formData.append("picture", data.picture);
    }

    formData.append("published", "1");

    data.participantIds.forEach((id) =>
        formData.append("participantIds[]", id)
    );

    const response = await fetch(`${API_URL}/api/wishlist/create-wishlist`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la création");
    }

    const result = await response.json();
    return result.data.wishlist;
}

import API_URL from "../../../config";
import type { Wishlist } from "../MyWishlists/MyWishlistsHelpers";

interface EditPayload {
    id: string;
    title: string;
    description?: string;
    picture?: File;
    access: string;
    published: boolean;
}

export async function editWishlist (data:EditPayload): Promise<Wishlist> {
const formData = new FormData();
    formData.append("title", data.title);
    formData.append("access", data.access);

    if (data.description !== undefined) {
        formData.append("description", data.description);
    }

    if (data.picture) {
        formData.append("picture", data.picture);
    }

    formData.append("published", String(data.published ? 1 : 0));

    const response = await fetch(`${API_URL}/api/wishlist/update-wishlist/${data.id}`,
        {
            method: "PUT",
            credentials: "include",
            body: formData,
        }
    );

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la modification");
    }

    const result = await response.json();
    return result.data.wishlist;
}

export async function deleteWishlist (id: number) {
    const response = await fetch(`${API_URL}/api/wishlist/delete-wishlist/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
    }
}
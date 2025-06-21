import API_URL from "../../../config";
import type { Wish } from "../MyWishes/MyWishesHelpers";

interface EditPayload {
    id: string;
    title: string;
    description?: string;
    picture?: File;
    price?: number;
    link?: string;
}

export async function editWish (data:EditPayload): Promise<Wish> {
    const formData = new FormData();
    formData.append("title", data.title);

    if (data.description !== undefined) {
        formData.append("description", data.description);
    }

    if (data.picture) {
        formData.append("picture", data.picture);
    }

    if (data.price !== undefined) {
        formData.append("price", String(Number(data.price)));
    }

    if (data.link !== undefined) {
        formData.append("link", data.link);
    }

    const response = await fetch(`${API_URL}/api/wishlist/update-wish/${data.id}`, 
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
    return result.data.wish;
}

export async function deleteWish (id: string) {
    const response = await fetch(`${API_URL}/api/wishlist/delete-wish/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
    }
}
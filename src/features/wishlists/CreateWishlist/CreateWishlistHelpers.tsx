import type { Wishlist } from "../MyWishlists/MyWishlistsHelpers";

interface CreateWishlistPayload {
    wishlistTitle: string;
    wishlistDescription?: string;
    wishlistPicture?: File;
    wishlistAccess: string;
}

export async function createWishlist(data:CreateWishlistPayload): Promise<Wishlist> {
    const formData = new FormData();
    formData.append("wishlistTitle", data.wishlistTitle);
    formData.append("wishlistAccess", data.wishlistAccess);

    if (data.wishlistDescription !== undefined) {
        formData.append("description", data.wishlistDescription);
    }

    if (data.wishlistPicture) {
        formData.append("picture", data.wishlistPicture);
    }

    const response = await fetch("http://localhost:4000/api/wishlist/create-wishlist",
        {
            method: "POST",
            credentials: "include",
            body: formData,
        }
    );

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la création");
    }

    const result = await response.json();
    return result.data.wishlist;
}
import API_URL from "../../../config";
import type { User } from "../MyProfile/MyProfileHelpers";

interface UpdateProfilePayload {
    pseudo: string;
    birthDate: string;
    picture?: File;
    description?: string;
}

export async function updateProfile(data: UpdateProfilePayload): Promise<User> {
    const formData = new FormData();
    formData.append("pseudo", data.pseudo);
    formData.append("birthDate", data.birthDate);

    if (data.description !== undefined) {
        formData.append("description", data.description);
    }

    if (data.picture) {
        formData.append("picture", data.picture);
    }

    const response = await fetch(`${API_URL}/api/users/update-profile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la mise à jour");
    }

    const result = await response.json();
    return result.data.user;
}

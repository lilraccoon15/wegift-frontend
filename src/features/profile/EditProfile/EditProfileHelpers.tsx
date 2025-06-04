import type { User } from "../MyProfile/MyProfileHelpers";

interface UpdateProfilePayload {
    firstName: string;
    lastName: string;
    birthDate: string;
    picture?: File;
    description?: string;
}

export async function updateProfile(data: UpdateProfilePayload): Promise<User> {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("birthDate", data.birthDate);

    if (data.description !== undefined) {
        formData.append("description", data.description);
    }

    if (data.picture) {
        formData.append("picture", data.picture);
    }

    const response = await fetch(
        "http://localhost:4000/api/users/update-profile",
        {
            method: "PUT",
            credentials: "include",
            body: formData,
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la mise à jour");
    }

    const result = await response.json();
    return result.data.user;
}

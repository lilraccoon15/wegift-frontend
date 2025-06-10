import { useEffect, useState } from "react";
import EditProfileForm from "../../features/profile/EditProfile/EditProfileForm";
import { useMyProfile } from "../../features/profile/MyProfile/MyProfileHelpers";
import { updateProfile } from "../../features/profile/EditProfile/EditProfileHelpers";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditProfile = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isLoading: loading, error } = useMyProfile();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState<Date>(new Date("2000-01-01"));
    const [picture, setPicture] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setDescription(user.description || "");
            setBirthDate(
                user.birthDate
                    ? new Date(user.birthDate)
                    : new Date("2000-01-01")
            );
        }
    }, [user]);

    useEffect(() => {
        if (picture) {
            const objectUrl = URL.createObjectURL(picture);
            setPicturePreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else if (user?.picture) {
            setPicturePreview(user.picture);
        } else {
            setPicturePreview(null);
        }
    }, [picture, user?.picture]);

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
            navigate("/profile/me");
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });

    const handleBirthDateChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        if (value) {
            setBirthDate(new Date(value));
        }
    };

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
            ];
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                alert("Format d’image non supporté.");
                return;
            }

            if (file.size > maxSizeInBytes) {
                alert("Fichier trop volumineux. Maximum 5 Mo.");
                return;
            }

            setPicture(file);
        }
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        mutation.mutate({
            firstName,
            lastName,
            birthDate: birthDate.toISOString().split("T")[0],
            description,
            picture: picture ?? undefined,
        });
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h1>éditer le profil</h1>
            <EditProfileForm
                firstName={firstName}
                lastName={lastName}
                birthDate={birthDate}
                picturePreview={picturePreview}
                description={description}
                onFirstNameChange={(e) => setFirstName(e.target.value)}
                onLastNameChange={(e) => setLastName(e.target.value)}
                onBirthDateChange={handleBirthDateChange}
                onDescriptionChange={(e) => setDescription(e.target.value)}
                onPictureChange={handlePictureChange}
                onSubmit={handleEditSubmit}
                buttonClassName="bg-green-600 hover:bg-green-700"
                error={submitError}
                buttondisabled={isSubmitting}
            />
        </>
    );
};

export default EditProfile;
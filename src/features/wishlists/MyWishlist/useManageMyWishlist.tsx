import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMyWishlistById } from "../MyWishlists/MyWishlistsHelpers";
import { useWishesByWishlistId } from "../MyWishes/MyWishesHelpers";
import { useEffect, useState } from "react";
import { createWish } from "../CreateWish/CreateWishHelpers";

export const useManageMyWishlist = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const { data: wishlist, isLoading: loadingWishlist } = useMyWishlistById(
        id ?? ""
    );
    const { data: wishes, isLoading: loadingWishes } = useWishesByWishlistId(
        id ?? ""
    );

    const [showCreate, setShowCreate] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [price, setPrice] = useState("");
    const [link, setLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [creationMode, setCreationMode] = useState<
        "none" | "choice" | "form" | "urlScrap"
    >("none");

    useEffect(() => {
        if (picture) {
            const objectUrl = URL.createObjectURL(picture);
            setPicturePreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPicturePreview(null);
        }
    }, [picture]);

    const mutation = useMutation({
        mutationFn: createWish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myWishes"] });

            setTitle("");
            setDescription("");
            setPicture(null);
            setPicturePreview(null);
            setPrice("");
            setLink("");
            setShowCreate(false);

            // navigate("/my-wishlists");
        },
        onError: (error: any) => {
            setSubmitError(error.message || "Erreur inconnue");
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });

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

    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        mutation.mutate({
            title,
            description: description ?? undefined,
            picture: picture ?? undefined,
            price,
            link,
        });
    };

    return {
        id,
        loadingWishes,
        loadingWishlist,
        wishlist,
        creationMode,
        setCreationMode,
        handleCreateSubmit,
        title,
        setTitle,
        handlePictureChange,
        description,
        setDescription,
        picturePreview,
        price,
        setPrice,
        link,
        setLink,
        submitError,
        isSubmitting,
        wishes
    }

}
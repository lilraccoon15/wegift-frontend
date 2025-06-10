import { useEffect, useState } from "react";
import CreateWishlistForm from "../../features/wishlists/CreateWishlist/CreateWishlistForm";
import { useMyWishlists } from "../../features/wishlists/MyWishlists/MyWishlistsHelpers";
import { createWishlist } from "../../features/wishlists/CreateWishlist/CreateWishlistHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MyWishlists = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

  const { data: wishlist, error, isLoading: loading } = useMyWishlists();
  const [wishlistTitle, setWishlistTitle] = useState("");
  const [wishlistDescription, setWishlistDescription] = useState("");
  const [wishlistPicture, setWishlistPicture] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [wishlistAccess, setWishlistAccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
  

  useEffect(() => {
    if (wishlistPicture) {
      const objectUrl = URL.createObjectURL(wishlistPicture);
      setPicturePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPicturePreview(null);
    }
  }, [wishlistPicture]);

  const mutation = useMutation({
    mutationFn: createWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myWishlists"] });
      navigate("/my-wishlists");
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
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const maxSizeInBytes = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert("Format d’image non supporté.");
        return;
      }

      if (file.size > maxSizeInBytes) {
        alert("Fichier trop volumineux. Maximum 5 Mo.");
        return;
      }

      setWishlistPicture(file);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    mutation.mutate({
        wishlistTitle,
        wishlistDescription: wishlistDescription ?? undefined,
        wishlistAccess,
        wishlistPicture: wishlistPicture ?? undefined,
    });

  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <h2>Mes listes</h2>
      {!wishlist && <p>vous n'avez pas de wishlist</p>}
      {wishlist && <h3>{wishlist.wishlistTitle}</h3>}
      <p>Créer une wishlist</p>
      <CreateWishlistForm
        onSubmit={handleCreateSubmit}
        wishlistTitle={wishlistTitle}
        onWishlistTitleChange={(e) => setWishlistTitle(e.target.value)}
        onWishlistPictureChange={handlePictureChange}
        wishlistDescription={wishlistDescription}
        onWishlistDescriptionChange={(e) =>
          setWishlistDescription(e.target.value)
        }
        picturePreview={picturePreview}
      />
    </>
  );
};

export default MyWishlists;

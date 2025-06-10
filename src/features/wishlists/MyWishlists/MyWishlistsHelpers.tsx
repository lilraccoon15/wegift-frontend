import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Wishlist {
  id: string;
  wishlistTitle: string;
  wishlistPicture: string;
  wishlistDescription: string;
  wishlist_access: number;
  wishlist_creator: string;
}

export function useMyWishlists() {
  return useQuery<Wishlist, Error>({
    queryKey: ["myWishlists"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4000/api/wishlist/get-user-wishlists", {
        withCredentials: true,
      });
      return res.data.data.wishlist;
    },
  });
}
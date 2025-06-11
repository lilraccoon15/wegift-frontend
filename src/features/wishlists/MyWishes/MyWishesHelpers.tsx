import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Wish {
    id: string;
    title: string;
    wishlistId: string;
  }

  export function useWishesByWishlistId(wishlistId: string) {
    return useQuery<Wish[], Error>({
      queryKey: ["wishes", wishlistId],
      queryFn: async () => {
        const res = await axios.get(`http://localhost:4000/api/wishlist/wishes?wishlistid=${wishlistId}`);
        return res.data;
      },
      enabled: !!wishlistId,
    });
  };

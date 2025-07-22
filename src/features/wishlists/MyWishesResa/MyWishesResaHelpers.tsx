import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface Wish {
  id: string;
  title: string;
  picture: string;
  description: string;
  link: string;
  price: string;
  status: "available" | "reserved";
  wishlistId: string;
  userId: string;
}

export interface WishReservation {
  id: string;
  wishId: string;
  userId: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface ReservedWish {
  wish: Wish;
  reservation: WishReservation;
}

export const useMyWishesReserved = () => {
  return useQuery<ReservedWish[], Error>({
    queryKey: ["myReservedWishes"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}/api/wishlist/my-reserved-wishes`,
        {
          withCredentials: true,
        }
      );

      return res.data?.data?.wishes ?? [];
    },
  });
};

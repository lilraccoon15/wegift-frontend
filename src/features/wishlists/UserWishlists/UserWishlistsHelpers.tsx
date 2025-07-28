import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface Wishlist {
  id: string;
  title: string;
  picture: string;
  description: string;
  access: number;
  userId: string;
  wishesCount?: number;
  collaborators?: Collaborators[];
}

export interface Collaborators {
  userId: string;
}

const invalidateWishlistQueries = (
  queryClient: QueryClient,
  wishlistId: string
) => {
  queryClient.invalidateQueries({
    queryKey: ["subscriptionStatus", wishlistId],
  });
  queryClient.invalidateQueries({ queryKey: ["wishlist", wishlistId] });
};

export function useWishlists(userId?: string) {
  return useQuery<Wishlist[], Error>({
    queryKey: ["myWishlists"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}/api/wishlist/wishlists/${userId}`,
        {
          withCredentials: true,
        }
      );
      return res.data?.data?.wishlists ?? [];
    },
    enabled: !!userId,
  });
}

export function useWishlistById(wishlistId?: string) {
  return useQuery<Wishlist | null, Error>({
    queryKey: ["wishlist", wishlistId],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}/api/wishlist/wishlist/${wishlistId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.data.wishlist ?? null;
    },
    enabled: !!wishlistId,
  });
}

export function useSubscriptionStatus(wishlistId?: string) {
  return useQuery<boolean, Error>({
    queryKey: ["subscriptionStatus", wishlistId],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}/api/wishlist/subscription-status/${wishlistId}`,
        { withCredentials: true }
      );
      return res.data?.data?.subscribed ?? false;
    },
    enabled: !!wishlistId,
  });
}

export function useSubscribe(wishlistId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axios.post(
        `${API_URL}/api/wishlist/subscribe/${wishlistId}`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      if (wishlistId) {
        invalidateWishlistQueries(queryClient, wishlistId);
      }
    },
  });
}

export function useUnsubscribe(wishlistId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_URL}/api/wishlist/unsubscribe/${wishlistId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      if (wishlistId) {
        invalidateWishlistQueries(queryClient, wishlistId);
      }
    },
  });
}

export function useRemoveSubscriber(
  wishlistId?: string,
  subscriberId?: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${API_URL}/api/wishlist/${wishlistId}/subscriber/${subscriberId}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      if (wishlistId) {
        invalidateWishlistQueries(queryClient, wishlistId);
      }
    },
  });
}

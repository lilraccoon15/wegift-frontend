import { useParams } from "react-router-dom";
import {
  useSubscribe,
  useSubscriptionStatus,
  useUnsubscribe,
  useWishlistById,
} from "./UserWishlistsHelpers";
import { useWishesByWishlistId } from "../UserWishes/UserWishesHelpers";

export const useManageWishlist = () => {
  const { id } = useParams();
  const wishlistQuery = useWishlistById(id);
  const wishesQuery = useWishesByWishlistId(id);
  const subscriptionQuery = useSubscriptionStatus(id);
  const subscribeMutation = useSubscribe(id);
  const unsubscribeMutation = useUnsubscribe(id);

  return {
    id,
    wishlist: wishlistQuery.data,
    wishes: wishesQuery.data,
    isLoading:
      wishlistQuery.isLoading ||
      wishesQuery.isLoading ||
      subscriptionQuery.isLoading,
    error: wishlistQuery.error || wishesQuery.error || subscriptionQuery.error,
    isSubscribed: subscriptionQuery.data,
    subscribe: subscribeMutation.mutate,
    unsubscribe: unsubscribeMutation.mutate,
    subscribing: subscribeMutation.isPending,
    unsubscribing: unsubscribeMutation.isPending,
  };
};

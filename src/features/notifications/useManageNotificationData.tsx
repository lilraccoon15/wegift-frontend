import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  markNotificationsAsRead,
  useMyNotifications,
} from "./NotificationHelpers";
import { useEffect, useState } from "react";

export const useManageNotificationData = (userId?: string) => {
  const { data: notifications, isLoading } = useMyNotifications(userId, {
    enabled: !!userId,
  });

  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const sortedNotifications = notifications
    ? [...notifications].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const unreadCount = sortedNotifications.filter((n) => !n.read).length;

  const markReadMutation = useMutation<boolean, Error, string>({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["myNotifications", userId],
        });
      }
      setError(null);
    },
    onError: (error: Error) => {
      setError(new Error(error.message || "Erreur inconnue"));
    },
  });

  useEffect(() => {
    if (userId && unreadCount > 0) {
      const timer = setTimeout(() => {
        markReadMutation.mutate(userId);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [userId, unreadCount]);

  return {
    notifications: sortedNotifications,
    isLoading,
    error,
  };
};

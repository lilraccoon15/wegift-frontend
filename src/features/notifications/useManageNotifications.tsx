import { useState } from "react";

export const useManageNotifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return {
    showNotifications,
    setShowNotifications
  }
};

import { useEffect, useState } from "react";

export const useCookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("cookieBannerSeen");
    if (!seen) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("cookieBannerSeen", "true");
    setIsVisible(false);
  };

  return { isVisible, handleClose };
};

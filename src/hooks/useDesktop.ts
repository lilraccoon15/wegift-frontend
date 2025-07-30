import { useEffect, useState } from "react";

const useIsDesktop = (minWidth = 1024) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= minWidth);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= minWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minWidth]);

  return isDesktop;
};

export default useIsDesktop;

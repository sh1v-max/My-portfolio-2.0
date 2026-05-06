import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant", // keep instant for snappy feel
      });
    }, 80); // slight delay to let layout animations finish

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
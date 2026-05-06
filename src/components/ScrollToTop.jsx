import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect fires synchronously after DOM mutations but BEFORE the
  // browser paints. This guarantees window.scrollY is 0 before Framer Motion
  // reads element positions for its layoutId animation (which internally does
  // getBoundingClientRect() + window.scrollY). The old setTimeout approach let
  // Framer Motion capture a stale scrollY, making the navbar indicator appear
  // to fly in from far below the header.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
import { useEffect, useState } from "react";

// Shown while a split route chunk downloads.
//
// It deliberately renders nothing for the first 250ms. On a warm cache a chunk
// resolves in well under that, and flashing a spinner for 40ms reads as a
// glitch rather than as progress — the page appears to flicker on every
// navigation. Past 250ms the wait is perceptible, so the placeholder earns its
// place and appears.
//
// It reserves the viewport height it replaces, so the footer does not jump up
// and back down around the swap.
export default function RouteFallback() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>
      {show && (
        <span
          aria-hidden="true"
          /* A bar rather than a spinner: it matches the route-loading bar the
             router already shows in Pages.jsx, and a pulse is cheaper to
             composite than a rotation. Under reduced motion it simply sits
             still at a visible opacity instead of pulsing. */
          className="h-0.5 w-24 rounded-full bg-accentColor/60 motion-safe:animate-pulse"
        />
      )}
    </div>
  );
}

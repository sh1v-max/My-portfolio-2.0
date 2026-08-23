/* eslint-disable react/prop-types */

// A placeholder block that occupies the exact space its real content will.
//
// The point is not the shimmer — it is that the box is already the right size,
// so nothing on the page moves when the data arrives. A spinner reserves no
// space at all, which is why spinner-then-content is a reliable way to produce
// layout shift.
//
// `motion-safe:` gates the pulse: under prefers-reduced-motion the block simply
// sits there at a visible tint.
export default function Skeleton({ className = "", rounded = "rounded-lg" }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-textColor/10 motion-safe:animate-pulse ${rounded} ${className}`}
    />
  );
}

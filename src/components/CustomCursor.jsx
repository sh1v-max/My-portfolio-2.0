import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring follows with lag; inner dot tracks directly
  const springConfig = { stiffness: 220, damping: 26, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only mount on fine-pointer (desktop) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, select, [tabindex]")) {
        setHovering(true);
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, select, [tabindex]")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.body.classList.add("cursor-none");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("cursor-none");
    };
  }, [mouseX, mouseY]);

  // Don't render on touch/coarse-pointer devices
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring — spring-lagged */}
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: visible ? 1 : 0,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 }, opacity: { duration: 0.15 } }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-accentColor/50"
      />

      {/* Inner dot — tracks cursor precisely */}
      <motion.div
        aria-hidden="true"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 6 : 6,
          height: hovering ? 6 : 6,
          opacity: visible ? (hovering ? 0.4 : 1) : 0,
        }}
        transition={{ opacity: { duration: 0.1 } }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-accentColor"
      />
    </>
  );
}

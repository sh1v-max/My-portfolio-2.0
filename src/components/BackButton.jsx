import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";

// One level up from the current route: /projects/taskforge → /projects.
const parentPath = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  segments.pop();
  return segments.length ? `/${segments.join("/")}` : "/";
};

// One idea, expressed at three moments rather than three unrelated effects:
// everything about this control moves left, the direction it takes you. It
// arrives from the left, leans left under the cursor, and pushes off left when
// pressed.
const LEAN = { type: "spring", stiffness: 420, damping: 28, mass: 0.6 };
const ARRIVE = { type: "spring", stiffness: 380, damping: 30, mass: 0.7 };

// Hover only. The press lives in CSS (`active:scale-95`) because Framer's tap
// gesture would not fire on this element — and Tailwind drives the standalone
// `scale` property while Framer writes `transform`, so the two compose rather
// than overwrite each other. The press scale is in-place feedback rather than
// travel, so it is kept under reduced motion; only the leftward travel drops.
const ARROW = { rest: { x: 0 }, lean: { x: -4 } };
const LABEL = { rest: { x: 0 }, lean: { x: -1.5 } };

export default function BackButton() {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  // Home is the root — there is nothing to go back to.
  const show = pathname !== "/";

  // React Router marks the session's first entry with key "default". Someone
  // arriving from a shared link or search has no in-app history, so stepping
  // back would either do nothing or eject them from the site; those visitors
  // go one level up the route instead. Never a dead control either way.
  const hasHistory = key !== "default";
  const goBack = () => (hasHistory ? navigate(-1) : navigate(parentPath(pathname)));

  // Under reduced motion the travel is dropped and only the fade remains —
  // the meaning survives, the movement does not.
  const arrival = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: -14 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -14 },
      };

  return (
    // initial={false} so it simply exists on a hard load — motion is reserved
    // for the moment it actually means something, arriving on a route change.
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          /* px-5 sm:px-7 mirrors the nav card's own inner padding, so the arrow
             lines up exactly under the hamburger rather than sitting flush to
             the container edge. */
          className="mx-auto mt-2 max-w-7xl px-5 sm:px-7"
          {...arrival}
          transition={reduceMotion ? { duration: 0.18, ease: "easeOut" } : ARRIVE}
        >
          <motion.button
            type="button"
            onClick={goBack}
            initial="rest"
            animate="rest"
            whileHover={reduceMotion ? undefined : "lean"}
            transition={LEAN}
            /* No surface at all — just the mark and the word. Only the children
               translate, so the button's own box never moves out from under the
               cursor and breaks its own hover. */
            className="group inline-flex min-h-11 items-center gap-2 text-textColor transition-[color,scale] duration-200 ease-out hover:text-accentColor focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentColor active:scale-95"
          >
            {/* The arrow travels furthest and the label trails it. That small
                difference is what reads as a lean rather than a flat slide.

                Pointer only. Keyboard focus gets the ring plus the same colour
                shift instead of the lean — Framer's whileFocus doesn't fire for
                keyboard focus on this element, and neither a state-driven
                `animate` nor a CSS group-focus-visible translate moved it, so
                there is no half-working travel left in here to mislead. */}
            <motion.span variants={ARROW} className="flex">
              <Icon icon="lucide:arrow-left" aria-hidden="true" className="h-4 w-4" />
            </motion.span>
            <motion.span variants={LABEL} className="text-sm font-medium">
              Back
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

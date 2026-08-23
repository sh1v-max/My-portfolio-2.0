// One motion rhythm for the whole site.
//
// Before this file, five components each declared their own copy of the same
// `hc`/`hi` reveal variants and their own spring numbers. Identical values
// duplicated five times is how a page ends up with five slightly different
// animation feels after a few edits.
//
// Rules these encode:
//   - animate `transform` and `opacity` only, never width/height/top/left
//   - exit runs at roughly 65% of enter, so leaving feels responsive
//   - every consumer reads useReducedMotion() and drops travel, keeping opacity

export const SPRING_LEAN = { type: "spring", stiffness: 420, damping: 28, mass: 0.6 };
export const SPRING_ARRIVE = { type: "spring", stiffness: 380, damping: 30, mass: 0.7 };
export const SPRING_STAGE = { type: "spring", stiffness: 200, damping: 26, mass: 0.7 };

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const DUR_MICRO = 0.2; // hover, colour
export const DUR_STATE = 0.28; // crossfade, expand
export const DUR_ENTER = 0.5; // section reveal
export const DUR_EXIT = 0.18; // ~65% of DUR_STATE
export const STAGGER = 0.045;

// Shared section-reveal pair, replacing the five copied `hc`/`hi` objects.
export const sectionHeader = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export const sectionItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

// Standard scroll-reveal viewport config: fire once, a fifth of the way in.
export const REVEAL_ONCE = { once: true, amount: 0.2 };

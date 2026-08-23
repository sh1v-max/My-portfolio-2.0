/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import { Icon } from "@iconify/react";

import MiniProjectCard from "./MiniProjectCard";
import { miniProjects } from "./miniProjects";

const headerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

// Visual card width, plus the gap between cards. Each slot spans the full
// pitch (width + gap) with the gap carried as padding inside the card, so one
// set's width is an exact multiple of the pitch and the wrap lands precisely
// on the set boundary.
//
// A 300px card fills most of a 375px phone, and two rows of them swallow the
// screen — hence a smaller card below the sm breakpoint. The pitch feeds the
// loop maths, so it has to be a real number rather than a Tailwind class.
const CARD_METRICS = {
  phone: { w: 232, gap: 14 },
  wide:  { w: 300, gap: 20 },
};
const WIDE_QUERY = "(min-width: 640px)";
const EASE = [0.22, 1, 0.36, 1];

function useCardMetrics() {
  const read = () =>
    typeof window !== "undefined" && window.matchMedia(WIDE_QUERY).matches
      ? CARD_METRICS.wide
      : CARD_METRICS.phone;

  const [metrics, setMetrics] = useState(read);

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const onChange = () => setMetrics(mq.matches ? CARD_METRICS.wide : CARD_METRICS.phone);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return metrics;
}

// Seconds to travel one full set. Because a set's width scales with the card
// pitch, this keeps the perceived cadence — roughly one card every 5s — the
// same on a phone as on a laptop. The two rows differ by ~15% so they never
// look mechanically locked to each other.
const ROW_SECONDS = [26, 30];

// Split the projects across the rows rather than repeating all ten in both:
// every project stays on screen, and none is announced twice to a screen reader.
const half = Math.ceil(miniProjects.length / 2);
const rowItems = [miniProjects.slice(0, half), miniProjects.slice(half)];

/**
 * One marquee row. `direction` is -1 to travel left, +1 to travel right.
 */
function MarqueeRow({ items, direction, loopSeconds, shouldReduceMotion, cardW, cardGap }) {
  const setWidth = items.length * (cardW + cardGap);
  const baseSpeed = setWidth / loopSeconds; // px/s

  // Two sets are rendered; x stays within [-setWidth, 0] and wraps at either
  // end, so the seam is never visible.
  const x = useMotionValue(direction > 0 ? -setWidth : 0);
  const speed = useMotionValue(0);

  // Hover/focus lives in a ref so pausing never re-renders the cards.
  const suspendedRef = useRef(false);

  // Crossing the breakpoint changes the pitch, so the old offset would no
  // longer line up with the set boundary. Rare enough to just re-seat it.
  useEffect(() => {
    x.set(direction > 0 ? -setWidth : 0);
  }, [setWidth, direction, x]);

  // Single place that decides how fast the row should be running. Pausing wins
  // over the base speed, and reduced motion wins over everything.
  const applySpeed = useCallback(() => {
    if (shouldReduceMotion) {
      speed.set(0);
      return;
    }
    const target = suspendedRef.current ? 0 : baseSpeed;
    animate(speed, target, {
      duration: target === 0 ? 0.6 : 0.7,
      ease: EASE,
    });
  }, [shouldReduceMotion, baseSpeed, speed]);

  // Re-resolve when the breakpoint changes or the visitor flips the OS
  // reduced-motion setting.
  useEffect(() => {
    applySpeed();
  }, [applySpeed]);

  useAnimationFrame((_, delta) => {
    const s = speed.get();
    if (!s) return;
    const next = x.get() + direction * (s * delta) / 1000;
    // Wrap by modulo rather than a single ±setWidth correction: one long frame
    // gap (a backgrounded tab resuming) can overshoot by more than a full set,
    // which a single correction could not recover from.
    x.set((((next % setWidth) + setWidth) % setWidth) - setWidth);
  });

  // Hover pauses for mouse users; focus does the same for keyboard users
  // tabbing through the card links.
  const suspend = () => {
    suspendedRef.current = true;
    applySpeed();
  };
  const resume = () => {
    suspendedRef.current = false;
    applySpeed();
  };

  const track = [...items, ...items];

  return (
    /*
      relative + overflow-hidden on the same element so edge fades sit exactly
      at the visible boundary. Negative margins bleed the row past the section
      padding.
    */
    <div
      className="relative -mx-4 overflow-hidden sm:-mx-6 md:-mx-8"
      onMouseEnter={suspend}
      onMouseLeave={resume}
      onFocusCapture={suspend}
      onBlurCapture={resume}
    >
      {/* Edge fades — inside the clipping container */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-mainBg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-mainBg to-transparent" />

      <motion.div className="flex py-4" style={{ x, width: "max-content" }}>
        {track.map((project, i) => {
          const isClone = i >= items.length;
          return (
            <div
              key={`${project.title}-${i}`}
              style={{ width: cardW + cardGap, flexShrink: 0 }}
              aria-hidden={isClone || undefined}
            >
              {/*
                The slot spans the full pitch and the card carries the gap as
                inner padding, so adjacent hover targets touch. A margin here
                would leave a strip with no hover target, and a moving marquee
                drags that strip under the cursor.
              */}
              <MiniProjectCard {...project} decorative={isClone} gutter={cardGap} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// `chromeless` strips the header and CTA so a host section can supply its own.
// The home page's Build Archive section does exactly that — it already owns the
// eyebrow, the derived build count and the door, and a second set inside would
// be the same section announced twice.
function MiniProjectsCarousel({ chromeless = false }) {
  const shouldReduceMotion = useReducedMotion();
  const { w: cardW, gap: cardGap } = useCardMetrics();

  return (
    <section className={chromeless ? "" : "py-6 md:py-10"}>
      {/* The container stays even in chromeless mode. Each MarqueeRow bleeds
          outward with `-mx-4 sm:-mx-6 md:-mx-8`, which is written to cancel
          exactly this element's padding. Dropping the container left those
          negative margins with nothing to cancel, and the rows pushed 56px past
          the viewport — 32px of real page overflow where there had been none. */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* ── Section header ── */}
        {!chromeless && (
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col items-start gap-3"
        >
          <motion.h2
            variants={headerItem}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            From the Build Archive
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-textMuted max-w-xl text-sm leading-relaxed"
          >
            Machine-coding challenges and interface experiments — each one built
            to drill a single pattern properly.
          </motion.p>
          <motion.div
            variants={headerItem}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>
        )}

        {/* ── Marquee rows — counter-scrolling ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-1"
        >
          <MarqueeRow
            items={rowItems[0]}
            direction={-1}
            loopSeconds={ROW_SECONDS[0]}
            shouldReduceMotion={shouldReduceMotion}
            cardW={cardW}
            cardGap={cardGap}
          />
          <MarqueeRow
            items={rowItems[1]}
            direction={1}
            loopSeconds={ROW_SECONDS[1]}
            shouldReduceMotion={shouldReduceMotion}
            cardW={cardW}
            cardGap={cardGap}
          />
        </motion.div>

        {/* ── CTA ── */}
        {!chromeless && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Link
            to="/frontend-lab"
            className="border-accentColor/30 bg-accentColor/5 text-accentColor hover:border-accentColor/60 hover:bg-accentColor/15 group inline-flex items-center gap-3 rounded-xl border px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 [&:hover]:shadow-[0_0_24px_color-mix(in_srgb,var(--color-accentColor)_15%,transparent)] active:scale-[0.97]"
          >
            Explore the Build Archive
            <Icon
              icon="lucide:arrow-right"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <p className="text-textMuted mb-12 text-xs tracking-wide">
            Beginner &nbsp;·&nbsp; Intermediate &nbsp;·&nbsp; Advanced
          </p>
        </motion.div>
        )}

      </div>
    </section>
  );
}

export default MiniProjectsCarousel;

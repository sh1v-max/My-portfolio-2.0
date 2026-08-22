/* eslint-disable react/prop-types */
import { useEffect } from "react";
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
// pitch (CARD_W + CARD_GAP) with the gap carried as padding inside the card,
// so one set's width is an exact multiple of the pitch and the wrap lands
// precisely on the set boundary.
const CARD_W = 300;
const CARD_GAP = 20;
const EASE = [0.22, 1, 0.36, 1];

// The two rows run at slightly different speeds so they never look mechanically
// locked to each other.
const ROW_SECONDS = [40, 46];

// Split the projects across the rows rather than repeating all ten in both:
// every project stays on screen, and none is announced twice to a screen reader.
const half = Math.ceil(miniProjects.length / 2);
const rowItems = [miniProjects.slice(0, half), miniProjects.slice(half)];

/**
 * One marquee row. `direction` is -1 to travel left, +1 to travel right.
 */
function MarqueeRow({ items, direction, loopSeconds, shouldReduceMotion }) {
  const setWidth = items.length * (CARD_W + CARD_GAP);
  const baseSpeed = setWidth / loopSeconds; // px/s

  // Two sets are rendered; x stays within [-setWidth, 0] and wraps at either
  // end, so the seam is never visible.
  const x = useMotionValue(direction > 0 ? -setWidth : 0);
  const speed = useMotionValue(0);

  // useReducedMotion resolves after mount, and can change at runtime if the
  // visitor flips the OS setting, so drive the base speed from an effect.
  useEffect(() => {
    speed.set(shouldReduceMotion ? 0 : baseSpeed);
  }, [shouldReduceMotion, baseSpeed, speed]);

  useAnimationFrame((_, delta) => {
    const s = speed.get();
    if (!s) return;
    let next = x.get() + direction * (s * delta) / 1000;
    if (next <= -setWidth) next += setWidth;
    else if (next >= 0) next -= setWidth;
    x.set(next);
  });

  // Hover pauses for mouse users; focus does the same for keyboard users
  // tabbing through the card links.
  const suspend = () => {
    if (shouldReduceMotion) return;
    animate(speed, 0, { duration: 0.6, ease: EASE });
  };
  const resume = () => {
    if (shouldReduceMotion) return;
    animate(speed, baseSpeed, { duration: 0.7, ease: EASE });
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
              style={{ width: CARD_W + CARD_GAP, flexShrink: 0 }}
              aria-hidden={isClone || undefined}
            >
              {/*
                The slot spans the full pitch and the card carries the gap as
                inner padding, so adjacent hover targets touch. A margin here
                would leave a strip with no hover target, and a moving marquee
                drags that strip under the cursor.
              */}
              <MiniProjectCard {...project} decorative={isClone} gutter={CARD_GAP} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function MiniProjectsCarousel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* ── Section header ── */}
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
            Mini Projects &amp; Creative Builds
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-textColor/60 max-w-xl text-sm leading-relaxed"
          >
            A collection of focused UI experiments, interactive components,
            and creative builds — each one sharpening a specific skill.
          </motion.p>
          <motion.div
            variants={headerItem}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

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
          />
          <MarqueeRow
            items={rowItems[1]}
            direction={1}
            loopSeconds={ROW_SECONDS[1]}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        {/* ── CTA ── */}
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
            Explore All Mini Projects
            <Icon
              icon="lucide:arrow-right"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <p className="text-textColor/40 mb-12 text-xs tracking-wide">
            Beginner &nbsp;·&nbsp; Intermediate &nbsp;·&nbsp; Advanced
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default MiniProjectsCarousel;

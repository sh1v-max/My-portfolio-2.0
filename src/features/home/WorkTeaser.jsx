/*
 * THESIS: A cinematic threshold between About and Contact — five project
 *   screenshots fanned like cards on a table, ambient blur from all of them
 *   at once, a single line that names the body of work, and one door to
 *   the full experience. Refuses a card grid, a list, or any kind of timeline.
 *
 * OWN-WORLD: Inherits the Projects page's cinematic language exactly —
 *   mainBg field, multi-source ambient blur at low opacity + brightness/
 *   saturate filter, four-directional vignette via theme tokens. The spread
 *   uses rotation + translateY + graduated opacity to create physical depth.
 *   accentColor on the CTA pill and nothing else. textColor at 100% / 55%.
 *
 * STORY: Visitor reaches this section after reading About. They see a fan of
 *   real project UIs, register that real work exists, feel the pull of the
 *   cinematic atmosphere, and click through to the full project experience.
 *
 * FIRST VIEWPORT: min-h-screen centered column. Large heading. Subtitle.
 *   Five screenshots fanned at ±10°/±5°/0°, graduated opacity 1→0.76→0.52,
 *   outer two hidden on mobile. Single "Explore My Projects →" CTA pill.
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { projects } from "../projects/project";

const featured = projects.filter((p) => p.title !== "Coming Soon...");

// Fan spread: x-offset (px from center), rotation, vertical drop, opacity
// Outer two cards are decorative — hidden on small screens
const spread = [
  { x: -195, rotate: -10, y: 16, opacity: 0.50, mobileHide: true  },
  { x: -98,  rotate:  -5, y:  6, opacity: 0.76, mobileHide: false },
  { x:   0,  rotate:   0, y:  0, opacity: 1.00, mobileHide: false },
  { x:  98,  rotate:   5, y:  6, opacity: 0.76, mobileHide: false },
  { x: 195,  rotate:  10, y: 16, opacity: 0.50, mobileHide: true  },
];

export default function WorkTeaser() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20"
      aria-label="Work preview"
    >
      {/* ── Ambient background: all five project images blended across viewport ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {featured.map((p, i) => (
          <img
            key={p.title}
            src={p.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: 0.10,
              filter: "blur(64px) brightness(1.8) saturate(1.3)",
              transform: `scale(1.2) translateX(${(i - 2) * 28}%)`,
              willChange: "transform",
            }}
          />
        ))}
        {/* Four-directional vignette — same token pattern as CinematicScene */}
        <div className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-mainBg via-mainBg/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-mainBg via-mainBg/55 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-mainBg/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-mainBg/70 to-transparent" />
      </div>

      {/* ── Content column ── */}
      <div className="relative z-10 flex w-full flex-col items-center gap-14 text-center">
        {/* Heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-4 px-6"
        >
          {/* Section identity badge — matches the portfolio-wide pattern */}
          <span className="inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accentColor" />
            My Work
          </span>

          <h2 className="text-5xl font-bold leading-none tracking-tight text-textColor sm:text-6xl md:text-7xl">
            Things I've Built
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-textColor/55 md:text-lg">
            Five production-grade projects — real APIs, AI integrations, and polished interfaces.
            Each one built to go further than tutorials.
          </p>

          {/* Accent rule — matches Timeline / MiniProjects section header pattern */}
          <div className="mt-1 h-1 w-16 rounded-full bg-linear-to-r from-accentColor to-accentColor/30" />
        </motion.div>

        {/* ── Fanned project screenshot spread ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative h-50 w-full"
          aria-hidden="true"
        >
          {featured.map((project, i) => {
            const { x, rotate, y, opacity, mobileHide } = spread[i];
            return (
              <div
                key={project.title}
                className={`absolute left-1/2 top-0 w-36 overflow-hidden rounded-xl border border-textColor/10 shadow-[0_14px_52px_rgba(0,0,0,0.52)] sm:w-40 md:w-44 ${
                  mobileHide ? "hidden sm:block" : ""
                }`}
                style={{
                  transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${rotate}deg)`,
                  opacity,
                  zIndex: featured.length - Math.abs(i - 2),
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover object-top"
                  style={{ maxHeight: "170px" }}
                  loading="lazy"
                />
                {/* Bottom fade dissolves the screenshot into the scene */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-mainBg/75 to-transparent" />
              </div>
            );
          })}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            to="/projects"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-accentColor/40 bg-accentColor/10 px-8 py-3.5 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
          >
            Explore My Projects
            <Icon
              icon="lucide:arrow-right"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

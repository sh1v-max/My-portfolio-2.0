import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile_pic from "../../assets/images/peakpx.jpg";
import { personal, skillGroups, availability, currentlyLearning } from "../../data/config";
import { realBuildCount } from "../frontend-lab/data/uiExperimentsData";
import { projects } from "../projects/project";
import SectionHeader from "../../components/SectionHeader";
import { DUR_ENTER, EASE_OUT, REVEAL_ONCE } from "../../lib/motion";

const shippedCount = projects.filter((p) => p.title !== "Coming Soon...").length;

// Counts derived from the same arrays that render them, so they cannot drift.
const QUICK_STATS = [
  { icon: "lucide:layers", value: String(shippedCount), label: "Production apps" },
  { icon: "lucide:flask-conical", value: String(realBuildCount), label: "Archive builds" },
  { icon: "lucide:map-pin", value: personal.location.split(",")[0], label: "India" },
];

export default function AboutTeaser() {
  return (
    <section className="bg-articleBg/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/*
          The eyebrow used to read "About Me" directly above an <h2> that also
          read "About Me" — the same words twice, at two sizes, saying nothing
          the second time. The eyebrow now sets a different register.
        */}
        <SectionHeader
          eyebrow="The short version"
          title="About Me"
          lede="Full-stack developer working across the React ecosystem and Node.js backends — building fast, scalable, motion-rich web applications."
          size="md"
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">

          {/* ── Identity ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_ONCE}
            transition={{ duration: DUR_ENTER, ease: EASE_OUT }}
            className="flex flex-col items-center gap-5 lg:items-start"
          >
            <div className="group relative shrink-0">
              <div className="border-accentColor/30 relative h-44 w-44 overflow-hidden rounded-full border-2 shadow-[0_0_40px_color-mix(in_srgb,var(--accentColor)_20%,transparent)]">
                <img
                  src={profile_pic}
                  alt={personal.name}
                  width={1200}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div aria-hidden="true" className="border-accentColor/15 absolute -inset-3 rounded-full border" />
              <div aria-hidden="true" className="bg-accentColor/10 pointer-events-none absolute -inset-8 -z-10 rounded-full blur-2xl" />
            </div>

            <div className="flex flex-col items-center gap-1.5 lg:items-start">
              <p className="text-textColor text-xl font-bold tracking-tight">{personal.name}</p>
              <p className="text-textSecondary text-base">{personal.role}</p>
              <p className="text-textMuted flex items-center gap-1.5 text-[15px]">
                <Icon icon="lucide:map-pin" aria-hidden="true" className="h-3.5 w-3.5" />
                {personal.location}
              </p>
            </div>

            {/* The words carry the status, not the colour of the dot — the dot
                is decoration on top of a label that already says it. */}
            {availability.open && (
              <p className="border-accentColor/25 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold uppercase tracking-widest">
                <span aria-hidden="true" className="bg-accentColor h-1.5 w-1.5 shrink-0 animate-pulse rounded-full" />
                {availability.label}
              </p>
            )}
          </motion.div>

          {/* ── Story ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_ONCE}
            transition={{ duration: DUR_ENTER, delay: 0.08, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <p className="text-textSecondary max-w-prose text-[17px] leading-[1.7]">
              I specialise in the React ecosystem — building responsive, performant
              interfaces with clean architecture and thoughtful UX. My toolkit spans
              the modern JavaScript stack, from React and Redux on the front end to
              Node.js and MongoDB behind it.
            </p>
            <p className="text-textSecondary max-w-prose text-[17px] leading-[1.7]">
              What pulls me in is the seam between design and engineering — the part
              where a decision about a loading state or a focus ring is both.
            </p>

            {/* Quick stats */}
            <ul className="flex flex-wrap gap-3">
              {QUICK_STATS.map(({ icon, value, label }) => (
                <li
                  key={label}
                  className="border-explorerBorder bg-articleBg flex items-center gap-2.5 rounded-xl border px-4 py-2.5 ring-1 ring-textColor/10"
                >
                  <Icon icon={icon} aria-hidden="true" className="text-accentColor h-4 w-4 shrink-0" />
                  <span className="text-textColor text-base font-bold tabular-nums">{value}</span>
                  <span className="text-textMuted text-[13px]">{label}</span>
                </li>
              ))}
            </ul>

            <div>
              <Link
                to="/about"
                className="group text-textColor hover:text-accentColor inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold transition-colors duration-200 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentColor"
              >
                {/* Promises what /about actually adds, rather than repeating
                    this section's own content back at the reader. */}
                The full story — timeline, education, services
                <Icon
                  icon="lucide:arrow-right"
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* ── Skill matrix ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_ONCE}
            transition={{ duration: DUR_ENTER, delay: 0.16, ease: EASE_OUT }}
            className="flex flex-col gap-7"
          >
            {/* Grouped, not a flat list. "React, Node, MongoDB, Git" in one row
                says what I have touched; the grouping says where I work. */}
            {skillGroups.map(({ label, items }) => (
              <div key={label}>
                <p className="text-textMuted mb-3 text-xs font-bold uppercase tracking-[0.18em]">
                  {label}
                </p>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item} className="text-textSecondary flex items-start gap-2 text-[15px]">
                      <Icon
                        icon="lucide:chevron-right"
                        aria-hidden="true"
                        className="text-accentColor mt-0.5 h-3.5 w-3.5 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* A footnote, not a feature — one line rather than a fourth list
                competing with the three above it. */}
            <p className="text-textMuted border-t border-explorerBorder/60 pt-5 text-sm leading-relaxed">
              <span className="text-textSecondary font-semibold">Currently learning:</span>{" "}
              {currentlyLearning.slice(0, 3).join(", ")}.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

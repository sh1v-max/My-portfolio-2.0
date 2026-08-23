import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { projects } from "../projects/project";

const EASE_EXPO = [0.22, 1, 0.36, 1];

const featured = projects.filter((p) => p.title !== "Coming Soon...").slice(0, 3);

// Section header — matches Contact / About / GitHub pattern
const hc = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const hi = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── 3-D perspective tilt hook ───────────────────────────────────────────────
function useTilt(maxDeg = 6) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-maxDeg, maxDeg]),
    { stiffness: 180, damping: 24 }
  );
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [maxDeg * 0.7, -maxDeg * 0.7]),
    { stiffness: 180, damping: 24 }
  );

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

export default function WorkTeaser() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* ─── Section header — matches Contact / About pattern ─── */}
        <motion.div
          variants={hc}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col items-start gap-3"
        >
          <motion.span
            variants={hi}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
            My Work
          </motion.span>

          <motion.h2
            variants={hi}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            variants={hi}
            className="text-textMuted max-w-xl text-base leading-relaxed"
          >
            Production-grade applications built with real APIs, AI integrations,
            and polished interfaces — each one going further than tutorials.
          </motion.p>

          <motion.div
            variants={hi}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* ─── Featured project — full-width horizontal strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.95, ease: EASE_EXPO }}
          className="mb-5"
        >
          <FeaturedCard project={featured[0]} />
        </motion.div>

        {/* ─── Supporting cards — 2-column ─── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {featured.slice(1).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.75, delay: i * 0.13, ease: EASE_EXPO }}
            >
              <SupportingCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* ─── Footer CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE_EXPO }}
          className="mt-10 flex justify-start"
        >
          <Link
            to="/projects"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accentColor/40 bg-accentColor/10 px-6 py-3 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
          >
            View all projects
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

// ─── FeaturedCard ────────────────────────────────────────────────────────────
function FeaturedCard({ project }) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(3.5);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover="hover"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="relative overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg transition-[border-color,box-shadow] duration-300 hover:border-accentColor/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_color-mix(in_srgb,var(--color-accentColor)_18%,transparent)]"
    >
      {/* Accent sweep line — Framer Motion variant, slides in from left */}
      <motion.div
        variants={{ hover: { scaleX: 1, transition: { duration: 0.55, ease: "easeOut" } } }}
        initial={{ scaleX: 0 }}
        style={{ originX: 0 }}
        className="absolute inset-x-0 top-0 z-20 h-[1.5px] bg-linear-to-r from-accentColor via-accentColor/70 to-transparent"
      />

      <div className="flex flex-col lg:flex-row">

        {/* ── Left: content ── */}
        <div className="flex flex-1 flex-col justify-between gap-7 p-7 lg:p-9">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] tracking-[0.22em] text-accentColor uppercase">
                Featured
              </span>
              <span className="h-px w-8 bg-accentColor/30" />
            </div>

            <h3 className="text-textColor text-3xl font-bold tracking-tight lg:text-4xl">
              {project.title}
            </h3>

            <p className="text-textMuted max-w-sm text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                className="border-accentColor/15 bg-accentColor/5 text-accentColor cursor-default select-none rounded-md border px-2.5 py-1 text-xs font-medium hover:border-accentColor/30 hover:text-accentColor transition-colors duration-200"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {project.caseStudy && (
              <Link
                to={project.caseStudy}
                className="group/link inline-flex min-h-10 items-center gap-2 rounded-full border border-accentColor/40 bg-accentColor/10 px-5 py-2.5 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
              >
                Case Study
                <Icon
                  icon="lucide:arrow-right"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
                />
              </Link>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo, opens in new tab`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-textColor/15 px-5 py-2.5 text-sm font-medium text-textMuted transition-all duration-300 hover:border-accentColor/25 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
              >
                Live Demo
                <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* ── Right: screenshot panel — motion-animated scale ── */}
        <div className="relative overflow-hidden lg:h-auto lg:w-[44%] lg:shrink-0">
          {/* Depth fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-articleBg to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t from-articleBg/90 to-transparent" />

          {/* Image — Framer Motion zoom driven by parent whileHover="hover" */}
          <motion.div
            variants={{
              hover: {
                scale: 1.07,
                transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
            className="h-56 lg:h-full"
          >
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              width={1600}
              height={900}
              decoding="async"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </motion.div>

          {/* Accent tint */}
          <motion.div
            variants={{
              hover: { opacity: 1, transition: { duration: 0.4 } },
            }}
            initial={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 bg-accentColor/4"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── SupportingCard ──────────────────────────────────────────────────────────
function SupportingCard({ project }) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5.5);

  const demoHost = project.demo
    ? (() => { try { return new URL(project.demo).hostname; } catch { return project.demo; } })()
    : "localhost:5173";

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover="hover"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg transition-[border-color,box-shadow] duration-300 hover:border-accentColor/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),0_0_0_1px_color-mix(in_srgb,var(--color-accentColor)_15%,transparent)]"
    >
      {/* Accent sweep line */}
      <motion.div
        variants={{ hover: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
        initial={{ scaleX: 0 }}
        style={{ originX: 0 }}
        className="absolute inset-x-0 top-0 z-20 h-[1.5px] bg-linear-to-r from-accentColor via-accentColor/60 to-transparent"
      />

      {/* Screenshot with browser chrome */}
      <div className="relative overflow-hidden">
        {/* Minimal browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-explorerBorder/60 bg-mainBg/40 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-red-400/45" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/45" />
          <span className="h-2 w-2 rounded-full bg-green-400/45" />
          <div className="ml-2 flex-1 truncate rounded-sm bg-white/5 px-2.5 py-0.5">
            <span className="font-mono text-[9px] tracking-wide text-textMuted">
              {demoHost}
            </span>
          </div>
        </div>

        {/* Image — motion zoom + brightness lift on hover */}
        <div className="overflow-hidden">
          <motion.div
            variants={{
              hover: {
                scale: 1.07,
                transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              width={1600}
              height={900}
              decoding="async"
              className="h-44 w-full object-cover object-top"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-articleBg to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-textColor text-xl font-bold tracking-tight">
          {project.title}
        </h3>
        {/* Three lines until the card is genuinely wide. It stays slim through
            tablet widths, where two lines clipped the longer summaries. */}
        <p className="text-textMuted line-clamp-3 flex-1 text-sm leading-relaxed lg:line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <motion.span
              key={tag}
              variants={{
                hover: { borderColor: "var(--color-accentColor)", transition: { duration: 0.2 } },
              }}
              className="border-accentColor/15 bg-accentColor/5 text-accentColor rounded-md border px-2 py-0.5 text-xs font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 pt-1">
          {project.caseStudy && (
            <Link
              to={project.caseStudy}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-accentColor/30 bg-accentColor/10 px-3 text-xs font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
            >
              <Icon icon="lucide:file-text" className="h-3 w-3" />
              Case Study
            </Link>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-textMuted hover:text-accentColor inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors duration-200 hover:bg-accentColor/5"
            >
              <Icon icon="lucide:external-link" className="h-3 w-3" />
              Live Demo
            </a>
          )}
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="text-textMuted hover:text-accentColor ml-auto inline-flex min-h-9 items-center rounded-lg px-2 transition-colors duration-200"
            >
              <Icon icon="lucide:github" className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

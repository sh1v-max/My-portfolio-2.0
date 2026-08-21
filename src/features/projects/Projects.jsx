import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { projects } from "./project";
import MiniProjectsCarousel from "./MiniProjectsCarousel";
import ProjectTimeline from "./ProjectTimeline";

const cinemaProjects = projects.filter((p) => p.title !== "Coming Soon...");

const headerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

function Projects({ asSection = false }) {
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const lastHoveredRef = useRef(0);
  if (hoveredIdx >= 0) lastHoveredRef.current = hoveredIdx;

  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springX = useSpring(cursorX, { stiffness: 75, damping: 18, mass: 1.2 });
  const springY = useSpring(cursorY, { stiffness: 75, damping: 18, mass: 1.2 });

  useEffect(() => {
    const handle = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const el  = document.elementFromPoint(e.clientX, e.clientY);
      const row = el?.closest("[data-project-row]");
      if (row) {
        setHoveredIdx(Number(row.dataset.projectRow));
      } else if (!el?.closest("[data-project-preview]")) {
        setHoveredIdx(-1);
      }
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [cursorX, cursorY]);

  return (
    <HelmetProvider>
      {!asSection && <Helmet><title>Shiv | Projects</title></Helmet>}

      {/* ── Floating image preview — cursor-centered, desktop only ── */}
      {/* All images pre-rendered and stacked; only opacity changes — no mount/unmount */}
      <motion.div
        data-project-preview
        className="pointer-events-none fixed z-9998 hidden md:block"
        style={{ left: springX, top: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hoveredIdx >= 0 ? 1 : 0, scale: hoveredIdx >= 0 ? 1 : 0.9 }}
        transition={{
          opacity: { duration: 0.2, delay: hoveredIdx >= 0 ? 0 : 0.25 },
          scale:   { duration: 0.35, delay: hoveredIdx >= 0 ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
          style={{ width: 420, height: 272 }}
        >
          {/* All images always in DOM — only opacity animates.          */}
          {/* No mount/unmount = zero jitter when crossing between rows. */}
          {cinemaProjects.map((project, i) => (
            <motion.img
              key={project.title}
              src={project.image}
              alt=""
              animate={{ opacity: hoveredIdx === i ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          {/* View button — pointer-events-auto to be clickable;          */}
          {/* elementFromPoint logic above handles hover-state correctly  */}
          <Link
            to={cinemaProjects[lastHoveredRef.current]?.caseStudy || "#"}
            aria-label={`View ${cinemaProjects[lastHoveredRef.current]?.title} case study`}
            className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-accentColor text-sm font-bold text-mainBg shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            View
          </Link>
        </div>
      </motion.div>

      {/* ── Page header — kept exactly as designed ── */}
      <section className="pt-16 pb-2 md:pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <motion.div
            variants={headerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-3"
          >
            <motion.span
              variants={headerItem}
              className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              Featured Projects
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
            >
              My Projects
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="text-textColor/60 max-w-xl text-base leading-relaxed"
            >
              Five production-grade applications built to go beyond tutorials —
              real APIs, AI integrations, and polished interfaces.
            </motion.p>
            <motion.div
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Editorial project list ── */}
      <section className="pb-8 pt-10 md:pb-16 md:pt-14" aria-label="Featured projects">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          {cinemaProjects.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={i}
              isFirst={i === 0}
              hovered={hoveredIdx === i}
            />
          ))}
        </div>
      </section>

      <ProjectTimeline />
      <MiniProjectsCarousel />
    </HelmetProvider>
  );
}

// ─── Single project row ───────────────────────────────────────────────────────
function ProjectRow({ project, index, isFirst, hovered }) {
  return (
    <motion.article
      data-project-row={index}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Top rule — only on first entry (others get rule from previous entry's bottom) */}
      {isFirst && <Rule hovered={hovered} />}

      {/* Row body */}
      <div className="relative py-9 md:py-12">
        {/* Hover background wash */}
        <div
          className={`pointer-events-none absolute inset-0 -mx-4 rounded-xl transition-opacity duration-500 sm:-mx-6 md:-mx-8 ${
            hovered ? "opacity-100" : "opacity-0"
          } bg-accentColor/3`}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-5 md:gap-8">
          {/* Sequence index */}
          <span
            aria-hidden="true"
            className={`shrink-0 pt-1.5 font-mono text-xs leading-none transition-colors duration-400 md:pt-2.5 ${
              hovered ? "text-accentColor/55" : "text-textColor/18"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Project title */}
            <h2
              className={`text-[2rem] font-bold leading-tight tracking-tight transition-colors duration-300 sm:text-4xl md:text-5xl lg:text-6xl ${
                hovered ? "text-accentColor" : "text-textColor"
              }`}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-textColor/40 md:text-[0.9375rem]">
              {project.description.length > 150
                ? project.description.slice(0, 150) + "…"
                : project.description}
            </p>

            {/* Tech tags */}
            <div className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1.5">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                    hovered
                      ? "border-accentColor/15 text-accentColor/50"
                      : "border-textColor/8 text-textColor/22"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {project.caseStudy && (
                <Link
                  to={project.caseStudy}
                  className="group/cta inline-flex min-h-11 items-center gap-2 rounded-full border border-textColor/12 px-5 py-2.5 text-sm font-medium text-textColor/45 transition-all duration-300 hover:border-accentColor/40 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
                >
                  Case Study
                  <Icon
                    icon="lucide:arrow-up-right"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                </Link>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo, opens in new tab`}
                  className="group/cta inline-flex min-h-11 items-center gap-2 rounded-full border border-textColor/12 px-5 py-2.5 text-sm text-textColor/35 transition-all duration-300 hover:border-accentColor/35 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
                >
                  Live Demo
                  <Icon
                    icon="lucide:external-link"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                </a>
              )}
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-textColor/10 text-textColor/22 transition-all duration-300 hover:border-accentColor/35 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
                >
                  <Icon icon="lucide:github" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rule — every entry has one */}
      <Rule hovered={hovered} />
    </motion.article>
  );
}

// Thin horizontal rule with accent sweep on hover (scaleX = no layout reflow)
function Rule({ hovered }) {
  return (
    <div className="relative h-px w-full bg-textColor/7">
      <motion.div
        className="absolute inset-0 origin-left bg-accentColor/40"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default Projects;

/*
 * THESIS: Each featured project owns one full viewport — ambient blur of its
 *   screenshot grounds the scene, large type commands attention, and content
 *   rises from darkness on scroll. Refuses the card grid entirely.
 *
 * OWN-WORLD: mainBg field + 22% opacity project image at blur(52px) brightness(1.8)
 *   saturate(1.3) + stacked linear-gradient vignettes. accentColor for chapter counter and pill borders.
 *   textColor at 100% / 55% for heading / description. No surface cards, no
 *   borders as structure — depth from opacity and blur layers alone. Fixed-right
 *   chapter dots: accentColor pill (h-8) active, muted circle (h-2) inactive.
 *
 * STORY: Visitor scrolls five project scenes in sequence — ambient image sets
 *   the mood, huge title names the work, description and CTAs follow. Chapter
 *   dots on the right track position. Timeline and mini-projects close the page.
 *
 * FIRST VIEWPORT: 100vh section, TaskForge (01/05). Chapter counter top-left
 *   (mono 11px accentColor/50). Title centered at 5–8rem bold. 5 tag pills
 *   above. Description (textColor/55) below. Case Study + Live Demo pills.
 *   Project screenshot peek emerges from bottom edge, fading into mainBg.
 *
 * FORM: Cinematic full-viewport sections, #1 from ranked list, seed d79aba54.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the
 *   finish review, the verdict, and DESIGN.md.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { projects } from "./project";
import MiniProjectsCarousel from "./MiniProjectsCarousel";
import ProjectTimeline from "./ProjectTimeline";

// Real projects only — Coming Soon lives elsewhere
const cinemaProjects = projects.filter((p) => p.title !== "Coming Soon...");

// Page header animation — identical to Contact / GitHub / Frontend Lab
const headerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

function Projects({ asSection = false }) {
  const [activeScene, setActiveScene] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);
  const sceneRefs = useRef([]);
  const cinematicRef = useRef(null);

  // Track which scene is 50%+ in view → drives the active dot
  useEffect(() => {
    const observers = cinemaProjects.map((_, i) => {
      const el = sceneRefs.current[i];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveScene(i);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  // Show dots while any cinematic scene is on screen
  useEffect(() => {
    const el = cinematicRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setDotsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToScene = useCallback((i) => {
    sceneRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <HelmetProvider>
      {!asSection && <Helmet><title>Shiv | Projects</title></Helmet>}

      {/* ── Chapter progress dots — fixed right rail, hidden on small screens ── */}
      <AnimatePresence>
        {dotsVisible && (
          <motion.nav
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-label="Project chapters"
            className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
          >
            {cinemaProjects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => scrollToScene(i)}
                aria-label={`${p.title}, chapter ${i + 1}`}
                className="group relative flex items-center justify-center"
              >
                {/* Hover tooltip — appears to the left */}
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-explorerBorder bg-articleBg px-2.5 py-1 text-xs text-textColor opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {p.title}
                </span>
                <span
                  className={`block w-2 rounded-full transition-all duration-500 ease-out ${
                    i === activeScene
                      ? "h-8 bg-accentColor"
                      : "h-2 bg-textColor/20 group-hover:bg-textColor/40"
                  }`}
                />
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Page header — matches site-wide structural pattern ── */}
      <section className="pt-16 pb-4 md:pt-20">
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

      {/* ── Cinematic featured project scenes ── */}
      <div ref={cinematicRef}>
        {cinemaProjects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => (sceneRefs.current[i] = el)}
          >
            <CinematicScene
              project={project}
              index={i}
              total={cinemaProjects.length}
            />
          </div>
        ))}
      </div>

      {/* ── Timeline ── */}
      <ProjectTimeline />

      {/* ── Mini Projects Carousel ── */}
      <MiniProjectsCarousel />
    </HelmetProvider>
  );
}

// ─── Scene animation variants ────────────────────────────────────────────────
const sceneContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const tagsGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const tagItem = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};
const titleGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const wordSlide = {
  hidden: { y: "108%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};
const fadeSlide = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── CinematicScene ──────────────────────────────────────────────────────────
function CinematicScene({ project, index, total }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Parallax: bg travels ±8% as section scrolls through viewport
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const words = project.title.split(" ");

  return (
    <section
      ref={sectionRef}
      aria-label={`${project.title} — project ${index + 1} of ${total}`}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Ambient background — parallax blurred screenshot ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.img
          src={project.image}
          alt=""
          style={{
            y: bgY,
            filter: "blur(52px) brightness(1.8) saturate(1.3)",
          }}
          className="absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-[0.22]"
        />
        {/* Vignettes */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-mainBg/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-mainBg via-mainBg/60 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-mainBg/55 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-mainBg/55 to-transparent" />
      </div>

      {/* ── Chapter counter — top-left ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute left-6 top-10 select-none font-mono text-[11px] tracking-[0.2em] text-accentColor/50 md:left-10"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
      </motion.div>

      {/* ── Main content — staggered variant tree ── */}
      <motion.div
        variants={sceneContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center"
      >
        {/* Tech stack tags — clip-path wipe stagger */}
        <motion.div
          variants={tagsGroup}
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          {project.tags.slice(0, 5).map((tag) => (
            <motion.span
              key={tag}
              variants={tagItem}
              className="rounded-full border border-accentColor/15 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-accentColor/55"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Project title — per-word masked slide-up */}
        <motion.h2
          variants={titleGroup}
          className="mb-5 text-5xl font-bold leading-none tracking-tight text-textColor sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom leading-tight">
              <motion.span variants={wordSlide} className="inline-block">
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeSlide}
          className="mx-auto mb-10 line-clamp-3 min-h-20 max-w-xl text-base leading-relaxed text-textColor/55 md:min-h-22 md:text-lg"
        >
          {project.description}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          variants={fadeSlide}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {project.caseStudy && (
            <Link
              to={project.caseStudy}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-accentColor/40 bg-accentColor/10 px-6 py-3 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
            >
              Case Study
              <Icon
                icon="lucide:arrow-right"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo, opens in new tab`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-textColor/15 px-6 py-3 text-sm font-medium text-textColor/55 transition-all duration-300 hover:border-accentColor/30 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
            >
              Live Demo
              <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
            </a>
          )}
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-textColor/30 transition-colors duration-300 hover:text-textColor/65"
            >
              <Icon icon="lucide:github" className="h-4 w-4" />
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* ── Project screenshot peek — browser chrome + bottom emerge ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.1, delay: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="relative w-[76vw] max-w-3xl overflow-hidden rounded-t-xl border-t border-l border-r border-textColor/8 shadow-[0_-24px_80px_rgba(0,0,0,0.45)]">
          {/* Minimal browser chrome bar */}
          <div className="flex items-center gap-1.5 border-b border-textColor/5 bg-mainBg/60 px-3 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-red-400/35" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/35" />
            <span className="h-2 w-2 rounded-full bg-green-400/35" />
            <div className="ml-2 flex-1 rounded-sm bg-white/5 px-2 py-0.5">
              <span className="font-mono text-[9px] tracking-wide text-textColor/20">
                {project.demo
                  ? (() => { try { return new URL(project.demo).hostname; } catch { return "localhost"; } })()
                  : "localhost:5173"}
              </span>
            </div>
          </div>
          {/* Screenshot */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-4/5 bg-linear-to-t from-mainBg via-mainBg/75 to-transparent" />
          <div className="absolute inset-x-0 top-0 z-10 h-1/5 bg-linear-to-b from-mainBg/40 to-transparent" />
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="w-full object-cover object-top opacity-35"
            style={{ maxHeight: "220px" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Projects;

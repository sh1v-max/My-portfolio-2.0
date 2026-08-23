/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { projects } from "./project";
import MiniProjectsCarousel from "./MiniProjectsCarousel";

const cinemaProjects = projects.filter((p) => p.title !== "Coming Soon...");

const projectMeta = {
  "Portfolio":  { period: "Oct 2024", periodEnd: null,       status: "ongoing"   },
  "TaskForge":  { period: "Sep 2024", periodEnd: null,       status: "ongoing"   },
  "BookVerse":  { period: "Jun 2024", periodEnd: "Aug 2024", status: "completed" },
  "Cinegraph":  { period: "Mar 2024", periodEnd: "Jun 2024", status: "completed" },
  "BiteSwift":  { period: "Nov 2023", periodEnd: "Mar 2024", status: "completed" },
};

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
  const listRef = useRef(null);
  if (hoveredIdx >= 0) lastHoveredRef.current = hoveredIdx;

  // Slightly overdamped and light, so the preview tracks the cursor quickly
  // with just a hint of trail and no wobble on direction changes.
  const follow = { stiffness: 200, damping: 24, mass: 0.6 };
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springX = useSpring(cursorX, follow);
  const springY = useSpring(cursorY, follow);

  const previewOpen = hoveredIdx >= 0;
  // While closing, keep showing the project we were last on. Binding the image
  // to hoveredIdx alone fades every image out the instant the cursor leaves,
  // which empties the preview before the box itself has finished leaving.
  const shownIdx = previewOpen ? hoveredIdx : lastHoveredRef.current;

  const pointerRef = useRef({ x: -1, y: -1, seen: false });
  const rafRef = useRef(0);

  // Resolving which row sits under the pointer is kept separate from the
  // mousemove handler so scrolling can re-run it. While scrolling the cursor
  // holds still and the page moves beneath it, so no mousemove fires — without
  // this the preview keeps describing the row it used to be over.
  const syncHovered = useCallback(() => {
    const { x, y, seen } = pointerRef.current;
    if (!seen) return;

    // Bail out entirely once the cursor leaves the editorial list's bounds —
    // without this, the preview (and its clickable "View" button) can get
    // stuck live over unrelated sections below, like the Build Archive marquee.
    const bounds = listRef.current?.getBoundingClientRect();
    if (!bounds || y < bounds.top || y > bounds.bottom) {
      setHoveredIdx(-1);
      return;
    }

    // Look past the preview itself. It is centred on the cursor, so its "View"
    // button sits directly under the pointer and would otherwise mask whichever
    // row is actually being hovered.
    const beneath = document
      .elementsFromPoint(x, y)
      .find((node) => !node.closest("[data-project-preview]"));

    const row = beneath?.closest("[data-project-row]");
    setHoveredIdx(row ? Number(row.dataset.projectRow) : -1);
  }, []);

  useEffect(() => {
    // Hit-testing is coalesced to one pass per frame; the pointer position
    // itself updates immediately so the preview never lags the cursor.
    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        syncHovered();
      });
    };

    const onMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, seen: true };
      // Tracked even out of bounds so the preview keeps trailing the cursor
      // while it fades out, rather than stalling at the edge of the list.
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      schedule();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, syncHovered]);

  return (
    <HelmetProvider>
      {!asSection && <Helmet><title>Shiv | Projects</title></Helmet>}

      {/* ── Floating image preview — cursor-centered, desktop only ── */}
      {/*
        Two nodes on purpose: the outer one carries position as a transform
        (x/y rather than left/top, so following the cursor never triggers
        layout), and the inner one owns the expand/shrink. Centering uses the
        CSS `translate` property while Framer animates `transform`, so the two
        compose instead of overwriting each other.
      */}
      {/* Hidden from assistive tech: it is a hover-only flourish that duplicates
          the row's own link, so exposing it would just add a second identical
          destination to the screen reader tree. Safe only because the row title
          is now a real link. */}
      <motion.div
        data-project-preview
        aria-hidden="true"
        /* Gated on hover capability, not width alone: every tablet is >=768px,
           so a width-only rule rendered this on iPads where no mousemove ever
           fires — the preview stayed invisible and the row's buttons were
           hidden too. The width floor is 1024 because this box is 420x272 and
           trails the cursor; below that it crowds the viewport, so narrow
           windows get the buttons instead even with a mouse attached.
           This must remain the exact complement of the CTA row's rule below. */
        className="pointer-events-none fixed left-0 top-0 z-9998 hidden [@media(hover:hover)_and_(min-width:1024px)]:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{ opacity: previewOpen ? 1 : 0, scale: previewOpen ? 1 : 0.82 }}
          transition={
            previewOpen
              ? {
                  // Springy expand on entry — the preview arrives with some life.
                  opacity: { duration: 0.16, ease: "easeOut" },
                  scale: { type: "spring", stiffness: 320, damping: 22, mass: 0.7 },
                }
              : {
                  // Brief hold before shrinking, so a quick exit still reads as
                  // the preview trailing the cursor rather than blinking out.
                  opacity: { duration: 0.22, delay: 0.15, ease: "easeOut" },
                  scale: { duration: 0.28, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
                }
          }
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
              animate={{ opacity: shownIdx === i ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          {/* Only clickable while actually hovering a row; otherwise this fixed,
              cursor-tracking element would intercept clicks meant for content
              elsewhere on the page. Never focusable — it sits inside an
              aria-hidden subtree, and the row title is the keyboard path. */}
          <Link
            to={cinemaProjects[shownIdx]?.caseStudy || "#"}
            tabIndex={-1}
            style={{ pointerEvents: previewOpen ? "auto" : "none" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-accentColor text-sm font-bold text-mainBg shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            View
          </Link>
        </div>
        </motion.div>
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
              Some of My Works
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="text-textMuted max-w-xl text-base leading-relaxed"
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
      <section ref={listRef} className="pb-8 pt-10 md:pb-16 md:pt-14" aria-label="Featured projects">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          {cinemaProjects.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={i}
              isFirst={i === 0}
              hovered={hoveredIdx === i}
              meta={projectMeta[project.title] ?? null}
            />
          ))}
        </div>
      </section>

      <MiniProjectsCarousel />
    </HelmetProvider>
  );
}

// ─── Single project row ───────────────────────────────────────────────────────
function ProjectRow({ project, index, isFirst, hovered, meta }) {
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
          } bg-accentColor/5`}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-5 md:gap-8">
          {/* Sequence index */}
          <span
            aria-hidden="true"
            className={`shrink-0 pt-1.5 font-mono text-xs leading-none transition-colors duration-400 md:pt-2.5 ${
              hovered ? "text-accentColor" : "text-textMuted"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Project title — the row's single navigation target.
                Its ::after spans the row body, so clicking anywhere in the row
                opens the case study; that is what the floating preview's "View"
                button has always implied, and it is the only path that also
                works for touch and keyboard. Kept on the title rather than
                wrapping the row in an <a>, which would nest the demo and source
                links inside another link. */}
            <h2
              className={`text-[2rem] font-bold leading-tight tracking-tight transition-colors duration-300 sm:text-4xl md:text-5xl lg:text-6xl ${
                hovered ? "text-accentColor" : "text-textColor"
              }`}
            >
              {project.caseStudy ? (
                <Link
                  to={project.caseStudy}
                  className="inline-flex items-center gap-2 rounded-sm after:absolute after:inset-x-0 after:-inset-y-9 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentColor md:after:-inset-y-12"
                >
                  {project.title}
                  {/* Carries the affordance where there is no hover to rely on */}
                  <Icon
                    icon="lucide:arrow-up-right"
                    aria-hidden="true"
                    className={`h-[0.55em] w-[0.55em] shrink-0 transition-transform duration-300 ease-out ${
                      hovered ? "translate-x-1 -translate-y-1" : ""
                    }`}
                  />
                </Link>
              ) : (
                project.title
              )}
            </h2>

            {/* Date + status — animated accent line, period, badge */}
            {meta && (
              <div className="mt-2 mb-1 flex flex-wrap items-center gap-2.5">
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px w-10 origin-left bg-linear-to-r from-accentColor/55 to-transparent"
                />
                <span className="font-mono text-xs text-textMuted sm:text-[0.8125rem]">
                  {meta.period}
                  {meta.periodEnd ? ` — ${meta.periodEnd}` : " — Present"}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    meta.status === "completed"
                      ? "bg-successBg text-successText"
                      : "bg-accentColor/10 text-accentColor"
                  }`}
                >
                  {meta.status === "completed" ? (
                    <>
                      <Icon icon="lucide:check" width="10" />
                      Completed
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accentColor" />
                      Ongoing
                    </>
                  )}
                </span>
              </div>
            )}

            {/* Description */}
            {/* Printed in full — descriptions are written short enough in
                project.js that clipping is never needed. Truncating here just
                hid the fact that the copy was too long. */}
            <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-relaxed text-textSecondary md:text-base">
              {project.description}
            </p>

            {/* Tech tags — were 10px at 45% opacity, under the readable floor on
                both counts. Sized and weighted so they can actually be scanned. */}
            <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 sm:text-xs ${
                    hovered
                      ? "border-accentColor/40 text-accentColor"
                      : "border-textColor/25 text-textMuted"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Shown wherever the hover preview is not — the exact complement of
                the preview's rule above, so every device gets one or the other
                and never neither. Tablets have no hover, so they get these
                buttons despite being wide. On a hover-capable laptop the preview
                carries the case study and the row itself is the link, so these
                would be noise. Raised above the title's row-spanning ::after so
                they stay independently clickable. */}
            <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2 [@media(hover:hover)_and_(min-width:1024px)]:hidden">
              {project.caseStudy && (
                <Link
                  to={project.caseStudy}
                  /* Full width on phones so the primary action reads as primary
                     and the two secondary controls pair off beneath it — the
                     three do not fit on one line at 375px, and letting the lone
                     icon orphan looked accidental. */
                  className="group/cta inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-accentColor/40 bg-accentColor/10 px-4 py-2.5 text-sm font-semibold text-accentColor transition-all duration-300 hover:border-accentColor/60 hover:bg-accentColor/15 focus-visible:outline-2 focus-visible:outline-accentColor sm:w-auto sm:justify-start"
                >
                  Know More
                  <Icon
                    icon="lucide:arrow-right"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                  />
                </Link>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo, opens in new tab`}
                  className="group/cta inline-flex min-h-11 items-center gap-2 rounded-full border border-textColor/25 px-4 py-2.5 text-sm text-textMuted transition-all duration-300 hover:border-accentColor/50 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-textColor/25 text-textMuted transition-all duration-300 hover:border-accentColor/50 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
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
    <div className="relative h-px w-full bg-textColor/12">
      <motion.div
        className="absolute inset-0 origin-left bg-accentColor/40"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default Projects;

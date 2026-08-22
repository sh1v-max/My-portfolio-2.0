import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const timelineData = [
  {
    title: "Portfolio",
    period: "Oct 2024",
    periodEnd: null,
    status: "ongoing",
    icon: "lucide:layout-dashboard",
    desc: "A motion-rich developer portfolio with themeable design tokens, live GitHub dashboard, serverless contact form via Netlify Functions + Resend, and per-project case studies. The one you're browsing right now.",
    tags: ["React", "Tailwind CSS 4", "Framer Motion", "GitHub API"],
    caseStudy: "/projects/portfolio",
    demo: "https://singhshiv.netlify.app/",
  },
  {
    title: "TaskForge",
    period: "Sep 2024",
    periodEnd: null,
    status: "ongoing",
    icon: "lucide:check-square",
    desc: "Production-grade task management REST API with JWT authentication, Zod validation, Swagger docs, and a 12-test suite. Deployed on Render with a React + Tailwind frontend on Vercel.",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Zod", "Swagger"],
    caseStudy: "/projects/taskforge",
    demo: "https://taskforge-eight-xi.vercel.app",
  },
  {
    title: "BookVerse",
    period: "Jun 2024",
    periodEnd: "Aug 2024",
    status: "completed",
    icon: "lucide:book-open",
    desc: "Modern book discovery platform with real-time search, trending sections, and detailed book pages — all powered by the Open Library API with custom hooks handling fetch, loading, and error states.",
    tags: ["React", "Open Library API", "Tailwind CSS", "React Router"],
    caseStudy: "/projects/bookverse",
    demo: "https://bookversedot.netlify.app/",
  },
  {
    title: "Cinegraph",
    period: "Mar 2024",
    periodEnd: "Jun 2024",
    status: "completed",
    icon: "lucide:film",
    desc: "AI movie, TV & anime recommendation engine built on your own taste graph — rate titles, get a computed taste profile, and let Gemini suggest what to watch next with personalized 'For You' rows and a full TMDB-backed catalog.",
    tags: ["React", "Firebase", "Gemini AI", "TMDB API", "Redux Toolkit"],
    caseStudy: "/projects/cinegraph",
    demo: "https://cinewatchgraph-ai.web.app",
  },
  {
    title: "BiteSwift",
    period: "Nov 2023",
    periodEnd: "Mar 2024",
    status: "completed",
    icon: "lucide:utensils",
    desc: "Built a high-fidelity Swiggy clone from scratch — real restaurant data through a Netlify Functions proxy, a rebuilt cart with proper quantity tracking, and a complete checkout flow with bill breakdown and order confirmation.",
    tags: ["React 19", "Redux Toolkit", "Parcel 2", "Netlify Functions"],
    caseStudy: "/projects/biteswift",
    demo: "https://yourbiteswift.netlify.app/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function ProjectTimeline() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 75, damping: 22, restDelta: 0.001 });

  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* ── Section header ── */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col items-start gap-3"
        >
          <motion.span
            variants={fadeUp}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
            Development Journey
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            Timeline
          </motion.h2>
          <motion.p variants={fadeUp} className="text-textColor/60 max-w-xl text-base leading-relaxed">
            Every project in the order it was built — what I made, when, and what it pushed me to learn next.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* ── Timeline body ── */}
        <div ref={timelineRef} className="relative">
          {/* Faint track — always visible */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-textColor/10" />
          {/* Scroll-driven accent fill */}
          <motion.div
            style={{ scaleY: lineScaleY, originY: 0 }}
            className="bg-accentColor/45 absolute bottom-0 left-5 top-0 w-px"
          />

          {timelineData.map((item, i) => (
            <TimelineEntry
              key={item.title}
              item={item}
              isLast={i === timelineData.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Single timeline entry (open layout, no card box) ────────────────────────
function TimelineEntry({ item, isLast }) {
  const [hovered, setHovered] = useState(false);
  const isCompleted = item.status === "completed";

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative pl-14 ${isLast ? "pb-0" : "pb-12 md:pb-14"}`}
    >
      {/* ── Dot on spine ── */}
      {/* Spine sits at left-5 (20px); dot is w-10 (40px) at left-0 → center = 20px ✓ */}
      <div
        className={`absolute left-0 top-1 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
          isCompleted
            ? `border-successBorder ${hovered ? "bg-successBg" : "bg-mainBg"}`
            : hovered
            ? "border-accentColor bg-accentColor/15"
            : "border-accentColor/50 bg-mainBg"
        }`}
      >
        <Icon
          icon={item.icon}
          width={15}
          className={`transition-colors duration-300 ${
            isCompleted ? "text-successText" : "text-accentColor"
          }`}
        />
        {/* Emanating pulse ring for ongoing projects */}
        {!isCompleted && (
          <motion.span
            animate={{ scale: [1, 1.65, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-accentColor/50"
          />
        )}
      </div>

      {/* ── Content ── */}
      <div className="relative min-w-0">
        {/* Hover background wash — matches Projects section */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-2xl bg-accentColor/5"
        />

        {/* Period + status badge */}
        <div className="relative mb-2.5 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs text-textColor/40">
            {item.period}
            {item.periodEnd ? ` — ${item.periodEnd}` : " — Present"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              isCompleted
                ? "bg-successBg text-successText"
                : "bg-accentColor/10 text-accentColor"
            }`}
          >
            {isCompleted ? (
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

        {/* Project title — large, accent on hover */}
        <h3
          className={`relative mb-3 text-3xl font-bold leading-tight tracking-tight transition-colors duration-300 md:text-4xl lg:text-5xl ${
            hovered ? "text-accentColor" : "text-textColor"
          }`}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="relative mb-4 max-w-2xl text-sm leading-relaxed text-textColor/65 md:text-[0.9375rem]">
          {item.desc}
        </p>

        {/* Tech tags — same monospace chip style as Projects section */}
        <div className="relative mb-5 flex flex-wrap gap-x-2.5 gap-y-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                hovered
                  ? "border-accentColor/30 text-accentColor/70"
                  : "border-textColor/20 text-textColor/45"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs — same button style as Projects section */}
        <div className="relative flex flex-wrap items-center gap-3">
          {item.caseStudy && (
            <Link
              to={item.caseStudy}
              className="group/link inline-flex min-h-11 items-center gap-2 rounded-full border border-textColor/25 px-5 py-2.5 text-sm font-medium text-textColor/70 transition-all duration-300 hover:border-accentColor/50 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
            >
              Case Study
              <Icon
                icon="lucide:arrow-up-right"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </Link>
          )}
          {item.demo && (
            <a
              href={item.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} live demo, opens in new tab`}
              className="group/link inline-flex min-h-11 items-center gap-2 rounded-full border border-textColor/25 px-5 py-2.5 text-sm text-textColor/60 transition-all duration-300 hover:border-accentColor/50 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
            >
              Live Demo
              <Icon
                icon="lucide:external-link"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

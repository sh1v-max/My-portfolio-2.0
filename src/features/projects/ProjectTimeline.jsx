import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

// ── Update these dates to match your actual start / end dates ──
const timelineData = [
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
  {
    title: "Netflix-GPT",
    period: "Mar 2024",
    periodEnd: "Jun 2024",
    status: "completed",
    icon: "lucide:film",
    desc: "AI-powered streaming platform with Firebase authentication, dynamic movie carousels powered by TMDB, and GPT-driven semantic search to discover movies by mood or description.",
    tags: ["React", "Firebase", "OpenAI", "TMDB API", "Redux Toolkit"],
    caseStudy: "/projects/netflix-gpt",
    demo: "https://netflixgpt-e671d.firebaseapp.com/",
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
    title: "Portfolio",
    period: "Oct 2024",
    periodEnd: null,
    status: "ongoing",
    icon: "lucide:layout-dashboard",
    desc: "A cinematic developer portfolio with 6 dynamic themes, live GitHub dashboard, serverless contact form via Netlify Functions + Resend, and per-project case studies. The one you're browsing right now.",
    tags: ["React", "Tailwind CSS 4", "Framer Motion", "GitHub API"],
    caseStudy: "/projects/portfolio",
    demo: "https://singhshiv.netlify.app/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function ProjectTimeline() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* ── Section Header ── */}
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
            The Journey
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-textColor text-4xl font-bold tracking-tight md:text-5xl">
            Timeline
          </motion.h2>
          <motion.p variants={fadeUp} className="text-textColor/60 max-w-xl text-base leading-relaxed">
            Every project in the order it was built — what I made, when, and what it pushed me to learn next.
          </motion.p>
          <motion.div variants={fadeUp} className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r" />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Vertical connector line — left on mobile, center on desktop */}
          <div className="bg-explorerBorder absolute bottom-0 left-5 top-6 w-px md:left-1/2 md:-translate-x-1/2" />

          {timelineData.map((item, i) => (
            <TimelineEntry
              key={item.title}
              item={item}
              index={i}
              isLast={i === timelineData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ item, index, isLast }) {
  const isLeft = index % 2 === 0;
  const isCompleted = item.status === "completed";

  const dotBorder = isCompleted ? "border-green-500/50" : "border-accentColor/50";
  const dotBg    = isCompleted ? "bg-green-500/10"    : "bg-accentColor/10";
  const iconColor = isCompleted ? "text-green-400"    : "text-accentColor";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative ${isLast ? "pb-0" : "pb-10 md:pb-14"}`}
    >

      {/* ─── DESKTOP: 3-column alternating ─── */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-10">

        {/* Left slot */}
        <div className="flex justify-end">
          {isLeft && <EntryCard item={item} align="right" isCompleted={isCompleted} />}
        </div>

        {/* Center dot */}
        <div className="flex flex-col items-center">
          <Dot dotBorder={dotBorder} dotBg={dotBg} iconColor={iconColor} item={item} isCompleted={isCompleted} size="lg" />
        </div>

        {/* Right slot */}
        <div className="flex justify-start">
          {!isLeft && <EntryCard item={item} align="left" isCompleted={isCompleted} />}
        </div>
      </div>

      {/* ─── MOBILE: line on left, card on right ─── */}
      <div className="flex items-start gap-6 md:hidden">
        <div className="flex shrink-0 flex-col items-center">
          <Dot dotBorder={dotBorder} dotBg={dotBg} iconColor={iconColor} item={item} isCompleted={isCompleted} size="sm" />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <EntryCard item={item} align="left" isCompleted={isCompleted} />
        </div>
      </div>

    </motion.div>
  );
}

function Dot({ dotBorder, dotBg, iconColor, item, isCompleted, size }) {
  const dim = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const iconSize = size === "lg" ? 18 : 15;

  return (
    <div className={`relative z-10 flex ${dim} shrink-0 items-center justify-center rounded-full border-2 ${dotBorder} ${dotBg}`}>
      <Icon icon={item.icon} width={iconSize} className={iconColor} />
      {!isCompleted && (
        <span className="bg-accentColor absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full" />
      )}
    </div>
  );
}

function EntryCard({ item, align, isCompleted }) {
  const right = align === "right";

  return (
    <div className={`group w-full max-w-md rounded-2xl border border-explorerBorder bg-articleBg p-5 transition-all duration-300 hover:border-accentColor/30 hover:shadow-lg ${right ? "text-right" : "text-left"}`}>

      {/* Period + Status */}
      <div className={`mb-3 flex flex-wrap items-center gap-2 ${right ? "justify-end" : "justify-start"}`}>
        <span className="text-textColor/40 font-mono text-xs">
          {item.period}{item.periodEnd ? ` — ${item.periodEnd}` : " — Present"}
        </span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          isCompleted ? "bg-green-500/10 text-green-400" : "bg-accentColor/10 text-accentColor"
        }`}>
          {isCompleted
            ? <><Icon icon="lucide:check" width="11" />Completed</>
            : <><span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />Ongoing</>
          }
        </span>
      </div>

      {/* Title */}
      <h3 className="text-textColor mb-2 text-xl font-bold tracking-tight">{item.title}</h3>

      {/* Description */}
      <p className="text-textColor/60 mb-4 text-sm leading-relaxed">{item.desc}</p>

      {/* Tags */}
      <div className={`mb-4 flex flex-wrap gap-1.5 ${right ? "justify-end" : "justify-start"}`}>
        {item.tags.map((tag) => (
          <span key={tag} className="border-accentColor/15 bg-accentColor/5 text-accentColor/70 rounded-md border px-2 py-0.5 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className={`flex flex-wrap gap-4 ${right ? "justify-end" : "justify-start"}`}>
        {item.caseStudy && (
          <Link
            to={item.caseStudy}
            className="text-accentColor hover:text-accentColor/70 inline-flex items-center gap-1 text-xs font-bold transition-colors"
          >
            Case Study <Icon icon="lucide:arrow-right" width="12" />
          </Link>
        )}
        <a
          href={item.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-textColor/40 hover:text-accentColor inline-flex items-center gap-1 text-xs font-medium transition-colors"
        >
          Live Demo <Icon icon="lucide:external-link" width="11" />
        </a>
      </div>
    </div>
  );
}

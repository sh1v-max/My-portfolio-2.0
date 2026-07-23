import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import heroImg      from "../../assets/images/portfolio/portfolio.png";
import aboutImg     from "../../assets/images/portfolio/about.png";
import projectsImg  from "../../assets/images/portfolio/projects.png";
import labImg       from "../../assets/images/portfolio/lab.png";
import githubImg    from "../../assets/images/portfolio/github.png";
import contactImg   from "../../assets/images/portfolio/contact.png";
import phoneHomeImg    from "../../assets/images/portfolio/phone_home.png";
import phoneAboutImg   from "../../assets/images/portfolio/phone_about.png";
import phoneProjectsImg from "../../assets/images/portfolio/phone_projects.png";
import phoneLabImg     from "../../assets/images/portfolio/phone_lab.png";
import phoneGithubImg  from "../../assets/images/portfolio/phone_github.png";
import phoneContactImg from "../../assets/images/portfolio/phone_contact.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const techStack = [
  { name: "React 18",            icon: "logos:react",           note: "Component-based UI library" },
  { name: "Vite",                icon: "logos:vitejs",          note: "Build tool with instant HMR" },
  { name: "Tailwind CSS 4",      icon: "logos:tailwindcss-icon",note: "Utility-first styling with CSS variables" },
  { name: "Framer Motion",       icon: "logos:framer",          note: "Cinematic animations & transitions" },
  { name: "React Router v6",     icon: "logos:react-router",    note: "Client-side page routing" },
  { name: "Context API",         icon: "logos:react",           note: "ThemeContext + GithubContext" },
  { name: "GitHub API",          icon: "mdi:github",            note: "Live repos, stats & contribution graph" },
  { name: "Netlify Functions",   icon: "logos:netlify",         note: "Serverless contact form backend" },
  { name: "Resend",              icon: "lucide:mail",           note: "Transactional email API" },
  { name: "react-helmet-async",  icon: "lucide:globe",          note: "Per-page SEO head management" },
];

const features = [
  {
    icon: "lucide:palette",
    title: "6+ Dynamic Themes",
    desc: "GitHub Dark, Dracula, Nord, Ayu, Night Owl, and VS Code themes — each applied instantly via CSS custom properties (--accentColor, --textColor, --mainBg, etc.) without a page reload. tw-colors bridges Tailwind utility classes to the CSS variables.",
  },
  {
    icon: "lucide:github",
    title: "Live GitHub Dashboard",
    desc: "A centralized GithubContext fetches user profile and all repos once on mount, shared across the GitHub page, Home, and About via useContext — no duplicate API calls. Shows contribution graph, pinned repos, and real-time stats.",
  },
  {
    icon: "lucide:layout-grid",
    title: "Bento Skills Grid",
    desc: "An asymmetric bento grid layout for the tech stack with custom col-span and row-span per skill card. Mobile-specific overrides fix layout gaps that appear on 3-column grids on small screens.",
  },
  {
    icon: "lucide:mail",
    title: "Serverless Contact Form",
    desc: "Contact form submits to a Netlify Function that calls the Resend API — no client-side API key exposure, no OAuth token expiry issues. React Hook Form handles validation with real-time error feedback.",
  },
  {
    icon: "lucide:file-text",
    title: "Project Case Studies",
    desc: "Dedicated case study pages for every major project — architecture breakdowns, challenge/solution writeups, and tech stack grids sourced from the actual project READMEs. Linked directly from each project card.",
  },
  {
    icon: "lucide:flask-conical",
    title: "Frontend Lab",
    desc: "A dedicated /frontend-lab page for experimental UI components and technical demonstrations — a space to show creative frontend work that doesn't fit neatly into a project card.",
  },
  {
    icon: "lucide:database",
    title: "Centralized Config",
    desc: "All personal data (name, social links, stats, pinned repos, skill lists) lives in src/data/config.js — a single source of truth that updates every page automatically. No more hunting for a LinkedIn URL across 5 files.",
  },
  {
    icon: "lucide:zap",
    title: "Cinematic Animations",
    desc: "Staggered entry animations on every page, floating illustration on the hero, scroll-triggered section reveals, and micro-interactions on buttons and cards — all via Framer Motion with spring physics.",
  },
];

const challenges = [
  {
    icon: "lucide:palette",
    problem: "6 themes that all need to work with Tailwind utility classes",
    solution:
      "Each theme defines CSS custom properties on :root (--accentColor, --textColor, --mainBg, --articleBg, --explorerBorder, etc.). Tailwind's tw-colors plugin maps these to utility classes like text-accentColor and bg-mainBg. Switching theme applies a new class to the root element — every Tailwind utility updates instantly via CSS variable resolution, no class regeneration needed.",
  },
  {
    icon: "lucide:mail",
    problem: "Contact form stopped working when the Gmail OAuth token expired",
    solution:
      "EmailJS was scrapped entirely. A Netlify serverless function (netlify/functions/contact.js) now receives the form POST, calls the Resend HTTP API with a long-lived API key stored in Netlify environment variables, and returns a success or error JSON. The client never holds any secret — the API key lives only in the server environment.",
  },
  {
    icon: "lucide:github",
    problem: "GitHub API called three times — once per page that needed user data",
    solution:
      "GithubContext wraps the entire app and fetches user + repos once in a useEffect. All three consumers (Github page, Home, About) call useGithub() to read from the same cached state. The context also exposes a repoCount derived value and handles loading/error states centrally.",
  },
];

const desktopScreenshots = [
  { src: aboutImg,    alt: "Portfolio about page",         label: "About" },
  { src: projectsImg, alt: "Portfolio projects page",      label: "Projects" },
  { src: labImg,      alt: "Portfolio frontend lab page",  label: "Frontend Lab" },
  { src: githubImg,   alt: "Portfolio GitHub dashboard",   label: "GitHub" },
  { src: contactImg,  alt: "Portfolio contact page",       label: "Contact" },
];

const phoneScreenshots = [
  { src: phoneHomeImg,    alt: "Portfolio mobile — home",          label: "Home" },
  { src: phoneAboutImg,   alt: "Portfolio mobile — about",         label: "About" },
  { src: phoneProjectsImg,alt: "Portfolio mobile — projects",      label: "Projects" },
  { src: phoneLabImg,     alt: "Portfolio mobile — frontend lab",  label: "Frontend Lab" },
  { src: phoneGithubImg,  alt: "Portfolio mobile — github",        label: "GitHub" },
  { src: phoneContactImg, alt: "Portfolio mobile — contact",       label: "Contact" },
];

const allScreenshots = [...desktopScreenshots, ...phoneScreenshots];

export default function PortfolioDetail() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + allScreenshots.length) % allScreenshots.length), []);
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % allScreenshots.length), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, prev, next]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Portfolio — Case Study | Shiv</title>
      </Helmet>

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 md:px-8">

        {/* ── Back ── */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/projects"
            className="text-textColor/50 hover:text-accentColor mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          >
            <Icon icon="lucide:arrow-left" width="16" />
            Back to Projects
          </Link>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="mb-16">
          <motion.span variants={fadeUp}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
            Case Study — You&apos;re looking at it
          </motion.span>

          <motion.h1 variants={fadeUp} className="text-textColor mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            This Portfolio
          </motion.h1>

          <motion.p variants={fadeUp} className="text-textColor/60 mb-6 max-w-2xl text-lg leading-relaxed">
            A cinematic, motion-heavy developer portfolio with 6 dynamic themes, a live GitHub
            dashboard, serverless contact form, centralized data config, and per-project case study
            pages — built with React 18, Tailwind CSS 4, and Framer Motion.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["React 18", "Tailwind CSS 4", "Framer Motion", "GitHub API", "Netlify Functions", "Full-Stack"].map((tag) => (
              <span key={tag} className="border-accentColor/20 bg-accentColor/5 text-accentColor rounded-full border px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
            <a href="https://singhshiv.netlify.app/" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Site
            </a>
            <a href="https://github.com/sh1v-max/My-portfolio-2.0" target="_blank" rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200">
              <Icon icon="mdi:github" width="16" />GitHub
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl">
            <img src={heroImg} alt="Portfolio home page" className="w-full object-cover object-top" />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textColor/70 leading-relaxed">
            This portfolio started as a simple project showcase and evolved into a full{" "}
            <strong className="text-textColor">design system and architecture exercise</strong>.
            The goal was to build something that felt premium — cinematic animations, a theming
            system that actually works across every component, a live GitHub integration, and a
            contact form that doesn&apos;t break when an OAuth token expires. Every design decision
            was intentional: the asymmetric bento grid, the staggered Framer Motion entries, the
            single config file that drives all personal data across the site. It&apos;s the project
            I keep coming back to as skills improve — and the one that shows how I think about
            architecture, not just UI.
          </p>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Most portfolio sites are static, single-themed, and fall apart the moment the contact
              form&apos;s auth token expires or the GitHub widget makes three separate API calls.
              Data is duplicated across files — change a social link in one place and two others
              still show the old URL.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Build a portfolio that functions like a real product: a CSS-variable theme system
              that scales to N themes, a single config file as the source of truth for all personal
              data, a serverless contact backend that can&apos;t expire, and live GitHub data
              fetched once and shared via context — not three times across three pages.
            </Card>
          </div>
        </Section>

        {/* ── Tech Stack ── */}
        <Section title="Tech Stack">
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {techStack.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                    <Icon icon={item.icon} width="20" height="20" />
                  </div>
                  <div>
                    <p className="text-textColor text-sm font-semibold">{item.name}</p>
                    <p className="text-textColor/40 text-xs">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Architecture ── */}
        <Section title="Architecture">
          <p className="text-textColor/70 mb-6 leading-relaxed">
            Feature-based folder structure with a strict{" "}
            <strong className="text-textColor">single source of truth</strong> for data and a
            context layer for shared async state.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "src/data/config.js", detail: "All personal info, social links, stats, pinned repos, skill lists — one file, referenced everywhere" },
                { step: "02", label: "ThemeContext", detail: "Holds active theme name, applies CSS custom property overrides on :root — Tailwind reads them via tw-colors" },
                { step: "03", label: "GithubContext", detail: "Fetches GitHub user + repos once on mount, exposes via useGithub() hook to Github page, Home, and About" },
                { step: "04", label: "Feature Modules", detail: "Each page lives in src/features/<name>/ with its own components, data, and styles — no cross-page imports" },
                { step: "05", label: "Netlify Function", detail: "netlify/functions/contact.js validates the form POST server-side and calls Resend — API key never reaches the browser" },
                { step: "06", label: "React Router v6", detail: "Client-side routing with nested routes under a Main layout — project case study routes at /projects/:slug" },
              ].map(({ step, label, detail }) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="text-accentColor/50 w-8 shrink-0 font-mono text-xs font-bold">{step}</span>
                  <div className="border-l border-explorerBorder pl-4">
                    <p className="text-textColor text-sm font-semibold">{label}</p>
                    <p className="text-textColor/50 text-xs leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Features ── */}
        <Section title="Key Features">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.15 }}
                className="border-explorerBorder bg-articleBg hover:border-accentColor/30 rounded-2xl border p-5 transition-colors duration-200"
              >
                <div className="text-accentColor mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accentColor/10">
                  <Icon icon={f.icon} width="18" />
                </div>
                <h3 className="text-textColor mb-1.5 text-sm font-bold">{f.title}</h3>
                <p className="text-textColor/60 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Desktop Screenshots ── */}
        <Section title="Desktop Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            {desktopScreenshots.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.1 }}
                className="border-explorerBorder group cursor-zoom-in overflow-hidden rounded-xl border"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative overflow-hidden">
                  <img src={s.src} alt={s.alt} className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                    <Icon icon="lucide:zoom-in" width="28" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                </div>
                <p className="text-textColor/40 bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Mobile Screenshots ── */}
        <Section title="Mobile Views">
          <div className="overflow-x-auto pb-3">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {phoneScreenshots.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.1 }}
                  className="border-explorerBorder group w-44 shrink-0 cursor-zoom-in overflow-hidden rounded-2xl border shadow-lg sm:w-52"
                  onClick={() => setLightboxIndex(desktopScreenshots.length + i)}
                >
                  <div className="relative overflow-hidden">
                    <img src={s.src} alt={s.alt} className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                      <Icon icon="lucide:zoom-in" width="24" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                  </div>
                  <p className="text-textColor/40 bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Challenges ── */}
        <Section title="Challenges & How I Solved Them">
          <div className="flex flex-col gap-5">
            {challenges.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}
                className="border-explorerBorder bg-articleBg rounded-2xl border p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="text-accentColor flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accentColor/10">
                    <Icon icon={c.icon} width="18" />
                  </div>
                  <p className="text-textColor/50 text-sm font-medium">
                    <span className="text-red-400/70 mr-1">Problem:</span>{c.problem}
                  </p>
                </div>
                <div className="border-l-2 border-accentColor/30 pl-4">
                  <p className="text-textColor/40 mb-1 text-xs font-semibold uppercase tracking-wider">Solution</p>
                  <p className="text-textColor/70 text-sm leading-relaxed">{c.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Learnings ── */}
        <Section title="What I Learned">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: "lucide:palette",     text: "CSS custom property theming — how to bridge runtime variables to a utility-class system like Tailwind" },
              { icon: "lucide:database",    text: "The config-as-source-of-truth pattern — one change propagates everywhere, eliminating stale data" },
              { icon: "lucide:share-2",     text: "React Context as a fetch cache — fetching once and sharing the result is always better than fetching per page" },
              { icon: "lucide:server",      text: "Serverless functions for frontend backends — never expose API keys client-side, even for 'simple' contact forms" },
              { icon: "lucide:zap",         text: "Framer Motion's stagger and viewport patterns for cinematic scroll reveals without layout jank" },
              { icon: "lucide:layout-grid", text: "Bento grid design — planning col-span and row-span layouts that stay non-broken across breakpoints" },
            ].map((item) => (
              <div key={item.text} className="border-explorerBorder bg-articleBg flex items-start gap-3 rounded-xl border p-4">
                <div className="text-accentColor mt-0.5 shrink-0"><Icon icon={item.icon} width="16" /></div>
                <p className="text-textColor/65 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true }}
          className="border-accentColor/20 bg-accentColor/5 mt-6 rounded-2xl border p-8 text-center"
        >
          <h3 className="text-textColor mb-2 text-xl font-bold">You&apos;re already here</h3>
          <p className="text-textColor/60 mb-6 text-sm">
            Explore the rest of the site or check the full source code on GitHub.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://singhshiv.netlify.app/" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Site
            </a>
            <a href="https://github.com/sh1v-max/My-portfolio-2.0" target="_blank" rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200">
              <Icon icon="mdi:github" width="16" />View Source
            </a>
            <Link to="/projects"
              className="text-textColor/50 hover:text-accentColor inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200">
              <Icon icon="lucide:arrow-left" width="14" />All Projects
            </Link>
          </div>
        </motion.div>

      </article>

      <Lightbox
        screenshots={allScreenshots}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
      />
    </HelmetProvider>
  );
}

function Lightbox({ screenshots, index, onClose, onPrev, onNext }) {
  const isOpen = index !== null;
  const current = isOpen ? screenshots[index] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:left-6"
            aria-label="Previous image"
          >
            <Icon icon="lucide:chevron-left" width="22" />
          </button>

          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.2 }}
            className="relative flex max-h-[90vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-sm font-medium text-white/60">{current.label}</p>
            <p className="text-xs text-white/30">{index + 1} / {screenshots.length}</p>
          </motion.div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6"
            aria-label="Next image"
          >
            <Icon icon="lucide:chevron-right" width="22" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
            aria-label="Close lightbox"
          >
            <Icon icon="lucide:x" width="20" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} className="mb-14">
      <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
        <h2 className="text-textColor text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
        <div className="from-accentColor to-accentColor/0 h-px flex-1 bg-linear-to-r" />
      </motion.div>
      <motion.div variants={fadeUp}>{children}</motion.div>
    </motion.section>
  );
}

function Card({ icon, label, children }) {
  return (
    <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
      <div className="text-accentColor mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accentColor/10">
        <Icon icon={icon} width="18" />
      </div>
      <p className="text-textColor mb-2 text-sm font-bold">{label}</p>
      <p className="text-textColor/60 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

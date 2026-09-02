/* eslint-disable react/prop-types */
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
  { name: "Vite 8 (rolldown)",   icon: "logos:vitejs",          note: "Build tool with instant HMR" },
  { name: "Tailwind CSS 4",      icon: "logos:tailwindcss-icon",note: "@theme inline tokens — no config file, no plugin bridge" },
  { name: "Framer Motion",       icon: "logos:framer",          note: "Cinematic animations, shared tokens in lib/motion.js" },
  { name: "Lenis",               icon: "lucide:mouse-pointer-2",note: "Smooth scroll, re-measured on every route change" },
  { name: "React Router v6",     icon: "logos:react-router",    note: "Route-level code splitting via React.lazy + Suspense" },
  { name: "Context API",         icon: "logos:react",           note: "ThemeContext + GithubContext" },
  { name: "GitHub API",          icon: "mdi:github",            note: "Live repos, stats & an interactive contribution graph" },
  { name: "vite-imagetools",     icon: "lucide:image",          note: "Build-time WebP conversion, zero call-site changes" },
  { name: "Netlify Functions",   icon: "logos:netlify",         note: "Serverless contact form backend" },
  { name: "Resend",              icon: "lucide:mail",           note: "Transactional email API" },
  { name: "react-helmet-async",  icon: "lucide:globe",          note: "Per-page SEO head management" },
];

const features = [
  {
    icon: "lucide:layout-list",
    title: "One Scroll, Every Answer",
    desc: "Home used to be a single-viewport hero with nowhere to go. It's now a continuous scroll through six sections — hero, About, Work, Build Archive, GitHub, Contact — each a real summary of its own deep-dive page, not a teaser that just repeats the title. A vertical section rail (desktop) tracks scroll position via IntersectionObserver and jumps to any section on click.",
  },
  {
    icon: "lucide:git-commit-horizontal",
    title: "A Contribution Calendar That's Actually Interactive",
    desc: "Hover any day for a glassmorphic tooltip with the exact count and date; click a day to open it on GitHub itself. The one number the REST API can't provide — a contributions total — isn't faked: a MutationObserver reads it back out of react-github-calendar's own rendered footer instead of firing a second API call.",
  },
  {
    icon: "lucide:copy",
    title: "Copy-to-Clipboard, Not Just mailto:",
    desc: "mailto: links don't reliably open a compose window on every browser/OS. A shared useCopyToClipboard hook puts a one-click copy affordance on every email address on the site — Footer, nav mega-menu, sidebar, About, Contact — so reaching out never depends on the visitor's mail client being configured.",
  },
  {
    icon: "lucide:palette",
    title: "6 Dynamic Themes, Native Tailwind v4",
    desc: "GitHub Dark, Dracula, Nord, Ayu (×2), and Night Owl — applied instantly via CSS custom properties with zero page reload. No plugin bridge: Tailwind v4's own @theme inline block maps every token directly, verified for WCAG AA contrast by sampling rendered pixels in all six themes rather than trusting computed color strings.",
  },
  {
    icon: "lucide:github",
    title: "One GitHub Fetch, Two Consumers",
    desc: "GithubContext fetches the user profile and all repos once on mount. Both the home page's GitHub section and the full /github dashboard read from that same cached state via useGithub() — the calendar, language mix, and recent-repos list all render from data that was only ever requested once per visit.",
  },
  {
    icon: "lucide:mail",
    title: "One Contact Form, Two Mounts",
    desc: "The same ContactForm component is embedded inline on home's Contact section and stands alone at /contact — never forked into two versions that could drift apart. Submits to a Netlify Function that calls Resend server-side, so the API key never reaches the browser.",
  },
  {
    icon: "lucide:file-text",
    title: "Project Case Studies",
    desc: "Dedicated case study pages for every major project — architecture breakdowns, challenge/solution writeups, and tech stack grids. /projects itself now redirects to the home page's Work section, since keeping both meant maintaining one design twice.",
  },
  {
    icon: "lucide:flask-conical",
    title: "The Build Archive",
    desc: "33 machine-coding challenges and small builds at /frontend-lab, filterable by level and category. On home, the same data renders as a full-bleed, dual counter-scrolling marquee instead of a static grid — a texture nothing else on the page has.",
  },
];

const challenges = [
  {
    icon: "lucide:layers",
    problem: "A paragraph's margin was silently zero — space-y-* just didn't work on it",
    solution:
      "The culprit was a plain, unlayered `h1,h2,p{margin:0}` reset sitting outside any @layer block in index.css. Tailwind wraps everything in @layer theme, base, components, utilities — but a rule written outside that stack sits above the whole thing regardless of specificity, so it silently beat every space-y-* utility trying to set a gap. This exact trap hit three separate features before the pattern was recognized (a font-family rule blocking custom font utilities for months; a vendored library's own display:flex beating a hidden class). Fix: wrap the global resets in @layer base so they lose to utilities the way every one of them was written assuming.",
  },
  {
    icon: "lucide:move-horizontal",
    problem: "Adding a copy button to a contact row caused 47px of page-wide horizontal overflow",
    solution:
      "The button itself wasn't the bug — it just finally exposed one. Flex and grid items default to min-width: auto, meaning \"never shrink below your content's natural size,\" which silently overrides truncate on a descendant unless the item itself also carries min-w-0. The row had fit without needing to shrink for months; the moment a new button gave it one more thing to lay out, the whole row grew past its grid track. Fixed by adding min-w-0 at the actual constraining ancestor — found by checking getBoundingClientRect() up the tree, since it's rarely the element you'd guess first.",
  },
  {
    icon: "lucide:crosshair",
    problem: "A hover tooltip on the contribution calendar kept landing in the wrong place, or not at all",
    solution:
      "The calendar renders inside cards with overflow-hidden and inside a scroll-reveal motion.div that leaves a resting transform on itself even after the animation finishes — either one silently breaks position:fixed math, because a transformed ancestor becomes the tooltip's containing block instead of the viewport. Portalling the tooltip to document.body via createPortal sidesteps both: it's no longer a descendant of either problem ancestor, so getBoundingClientRect()-based positioning against the viewport just works.",
  },
  {
    icon: "lucide:mail",
    problem: "Contact form stopped working when the Gmail OAuth token expired",
    solution:
      "EmailJS was scrapped entirely. A Netlify serverless function (netlify/functions/contact.js) now receives the form POST, calls the Resend HTTP API with a long-lived API key stored in Netlify environment variables, and returns a success or error JSON. The client never holds any secret — the API key lives only in the server environment.",
  },
  {
    icon: "lucide:github",
    problem: "GitHub API called multiple times — once per page that needed user data",
    solution:
      "GithubContext wraps the entire app and fetches user + repos once in a useEffect. Every consumer — the Github dashboard and the home page's GitHub section — calls useGithub() to read from the same cached state, so the data is fetched once per visit rather than per view.",
  },
];

const desktopScreenshots = [
  { src: aboutImg,    alt: "Portfolio about page",                                   label: "About" },
  { src: projectsImg, alt: "Home's Work section — the editorial project list",       label: "Work" },
  { src: labImg,      alt: "Portfolio build archive page", label: "Build Archive" },
  { src: githubImg,   alt: "GitHub section with the interactive contribution calendar tooltip open", label: "GitHub" },
  { src: contactImg,  alt: "Portfolio contact page",       label: "Contact" },
];

const phoneScreenshots = [
  { src: phoneHomeImg,    alt: "Portfolio mobile — home",          label: "Home" },
  { src: phoneAboutImg,   alt: "Portfolio mobile — about",         label: "About" },
  { src: phoneProjectsImg,alt: "Portfolio mobile — projects",      label: "Projects" },
  { src: phoneLabImg,     alt: "Portfolio mobile — build archive", label: "Build Archive" },
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
            to="/#projects"
            className="text-textMuted hover:text-accentColor mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
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

          <motion.p variants={fadeUp} className="text-textMuted mb-6 max-w-2xl text-lg leading-relaxed">
            A single-scroll developer portfolio: one home page answers every question — who I am,
            what I&apos;ve shipped, what I&apos;m building daily, how to reach me — at summary
            depth, and each section&apos;s door leads to a page that goes deeper. 6 dynamic themes,
            a live GitHub dashboard with a genuinely interactive contribution calendar,
            copy-to-clipboard contact everywhere, and a serverless form embedded directly on the
            page you&apos;re already on — built with React 18, Tailwind CSS 4, and Framer Motion.
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
            <img src={heroImg} alt="Portfolio home page" width={1600} height={900} loading="lazy" decoding="async" className="w-full object-cover object-top" />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textSecondary leading-relaxed">
            This portfolio started as a simple project showcase and has since gone through a full{" "}
            <strong className="text-textColor">redesign of its own governing idea</strong>: home
            used to be a single-viewport hero with a &quot;view my work&quot; button as its only
            job. It&apos;s now a continuous single scroll that answers every real question —
            identity, work, daily activity, how to get in touch — at summary depth, with each
            section promising something genuinely deeper on the page it leads to, never just a
            smaller copy of what&apos;s already on screen. Underneath that: a theming system built
            on Tailwind v4&apos;s native tokens (not a plugin bridge), a GitHub integration with a
            contribution calendar you can actually hover and click through, and a contact form
            that&apos;s the same component whether you&apos;re looking at it inline on home or on
            its own page. It&apos;s the project I keep coming back to as skills improve — and the
            one that shows how I think about
            architecture and craft, not just UI.
          </p>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Most portfolio sites make a visitor choose between a fast scan and real depth — either
              a thin single-page summary with nothing to back it up, or a maze of separate pages
              that bury the actual work three clicks deep. Add a contact form whose auth token can
              silently expire, and a GitHub widget re-fetching the same data on every page, and the
              site stops feeling like something a full-stack developer actually built.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              One home page that answers every question at summary depth in a single scroll, where
              each section&apos;s door promises real depth rather than repeating itself — backed by a
              theme system that scales to N themes on native tokens, a serverless contact backend
              that can&apos;t expire, and live GitHub data fetched once and shared via context
              across every page that needs it.
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
                    <p className="text-textMuted text-xs">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Architecture ── */}
        <Section title="Architecture">
          <p className="text-textSecondary mb-6 leading-relaxed">
            Feature-based folder structure with a strict{" "}
            <strong className="text-textColor">single source of truth</strong> for data and a
            context layer for shared async state.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "MainScrollPage.jsx", detail: "Assembles six <section id=\"...\"> blocks — hero, About, Work, Build Archive, GitHub, Contact — and scrolls to one on a /#hash deep link" },
                { step: "02", label: "src/data/config.js", detail: "All personal info, social links, skill groups, pinned repos — one file, referenced everywhere" },
                { step: "03", label: "ThemeContext", detail: "Holds active theme name, applies a theme-X class to the root — Tailwind v4's own @theme inline block resolves every token, no plugin needed" },
                { step: "04", label: "GithubContext", detail: "Fetches GitHub user + repos once on mount, exposed via useGithub() to the Github dashboard and the home page section — same cached state, one fetch per visit" },
                { step: "05", label: "hooks/ + lib/motion.js", detail: "useActiveSection (IntersectionObserver-driven scroll tracking) and useCopyToClipboard, plus shared Framer Motion tokens — replacing what used to be per-page copy-pasted variants" },
                { step: "06", label: "Netlify Function", detail: "netlify/functions/contact.js validates the form POST server-side and calls Resend — API key never reaches the browser" },
                { step: "07", label: "React Router v6", detail: "Home stays eager; every other route is React.lazy + Suspense. /projects redirects to /#projects — the retired page's exact UI now lives there instead" },
              ].map(({ step, label, detail }) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="text-accentColor w-8 shrink-0 font-mono text-xs font-bold">{step}</span>
                  <div className="border-l border-explorerBorder pl-4">
                    <p className="text-textColor text-sm font-semibold">{label}</p>
                    <p className="text-textMuted text-xs leading-relaxed">{detail}</p>
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
                <p className="text-textMuted text-sm leading-relaxed">{f.desc}</p>
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
                  <img width={1600} height={900} loading="lazy" decoding="async" src={s.src} alt={s.alt} className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                    <Icon icon="lucide:zoom-in" width="28" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                </div>
                <p className="text-textMuted bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
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
                    <img src={s.src} alt={s.alt} width={409} height={912} loading="lazy" decoding="async" className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                      <Icon icon="lucide:zoom-in" width="24" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                  </div>
                  <p className="text-textMuted bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
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
                  <p className="text-textMuted text-sm font-medium">
                    <span className="text-dangerText mr-1">Problem:</span>{c.problem}
                  </p>
                </div>
                <div className="border-l-2 border-accentColor/30 pl-4">
                  <p className="text-textMuted mb-1 text-xs font-semibold uppercase tracking-wider">Solution</p>
                  <p className="text-textSecondary text-sm leading-relaxed">{c.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Learnings ── */}
        <Section title="What I Learned">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: "lucide:layers",      text: "CSS cascade layers aren't optional bookkeeping — an unlayered rule silently outranks every Tailwind utility regardless of specificity, and it cost real hours three separate times before the pattern was obvious" },
              { icon: "lucide:move-horizontal", text: "Flex/grid items default to min-width: auto — a row can look fine for months and only reveal a missing min-w-0 the day something finally needs to shrink" },
              { icon: "lucide:aperture",    text: "position: fixed math breaks the moment any ancestor has a transform or overflow-hidden — portalling to document.body is the reliable fix for anything that must escape a card" },
              { icon: "lucide:database",    text: "The config-as-source-of-truth pattern — one change propagates everywhere, eliminating stale data" },
              { icon: "lucide:share-2",     text: "React Context as a fetch cache — fetching once and sharing the result is always better than fetching per page" },
              { icon: "lucide:eye",         text: "IntersectionObserver for scroll-position tracking beats scroll-event math — no throttling, no manual rect comparisons, and it's what both the section rail and bottom nav are built on" },
              { icon: "lucide:server",      text: "Serverless functions for frontend backends — never expose API keys client-side, even for 'simple' contact forms" },
              { icon: "lucide:zap",         text: "Framer Motion's stagger and viewport patterns for cinematic scroll reveals without layout jank" },
            ].map((item) => (
              <div key={item.text} className="border-explorerBorder bg-articleBg flex items-start gap-3 rounded-xl border p-4">
                <div className="text-accentColor mt-0.5 shrink-0"><Icon icon={item.icon} width="16" /></div>
                <p className="text-textSecondary text-sm leading-relaxed">{item.text}</p>
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
          <p className="text-textMuted mb-6 text-sm">
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
            <Link to="/#projects"
              className="text-textMuted hover:text-accentColor inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200">
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
              decoding="async"
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
      <p className="text-textMuted text-sm leading-relaxed">{children}</p>
    </div>
  );
}

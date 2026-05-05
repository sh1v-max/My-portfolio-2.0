import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageNavigator from "../../components/PageNavigator";
import profile_pic from "../../assets/images/peakpx.jpg";
import BentoSkills from "./BentoSkills";
import MarqueeSkills from "./MarqueeSkills";

// ─── Animation System (matches Projects / GitHub / Contact) ───
const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// reusable section reveal (same as GitHub Dashboard sections)
const sectionReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
});

// ─── Data ─────────────────────────────────────────────────────
const services = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "UI Development",
    desc: "Pixel-perfect, responsive interfaces built with React and Tailwind CSS — designed to feel premium on every screen.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "React Applications",
    desc: "Scalable SPAs with clean state management (Redux / Recoil), client-side routing, and reusable component architecture.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "API Integration",
    desc: "Connecting frontends to REST APIs with Axios, handling auth flows (JWT / Firebase), and managing async state gracefully.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Motion & Interaction",
    desc: "Bringing interfaces to life with Framer Motion — scroll-triggered animations, micro-interactions, and cinematic transitions.",
  },
];

const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    year: "2021 – 2025",
    note: "Core CS fundamentals, DSA, and software engineering principles.",
  },
  {
    degree: "Full-Stack Web Development",
    institution: "Cohort 2.0 — Harkirat Singh",
    year: "2024 – 2025",
    note: "Intensive full-stack program covering Node.js, databases, DevOps basics, and system design.",
  },
  {
    degree: "Namaste React — Deep Dive",
    institution: "Akshay Saini",
    year: "2024",
    note: "In-depth React course covering internals, rendering, hooks, Redux, and production patterns.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "First Line of Code",
    desc: "Started with HTML & CSS, discovered the web was buildable — not magic.",
  },
  {
    year: "2023",
    title: "JavaScript & React",
    desc: "Learned vanilla JS deeply, then fell into the React ecosystem and never looked back.",
  },
  {
    year: "2024",
    title: "Full-Stack & Production",
    desc: "Built Node.js backends, integrated MongoDB, deployed apps to Vercel & Firebase. Joined Cohort 2.0.",
  },
  {
    year: "2025",
    title: "Portfolio & Beyond",
    desc: "Shipped this portfolio, exploring Next.js, Three.js, and building increasingly complex UIs.",
  },
];

const funFacts = [
  {
    emoji: "☕",
    label: "Coffee-powered",
    desc: "Best code happens after the second cup.",
  },
  {
    emoji: "🎮",
    label: "Gamer",
    desc: "Strategy games & open-world RPGs in downtime.",
  },
  {
    emoji: "🎵",
    label: "Lo-fi Coder",
    desc: "Lo-fi hip-hop is basically a requirement to focus.",
  },
  {
    emoji: "📖",
    label: "Always Learning",
    desc: "Currently: Next.js App Router & Three.js.",
  },
];

// ─── Component ────────────────────────────────────────────────
function About() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | About</title>
        <meta
          name="description"
          content="Shiv Shankar Singh — Front-End Developer specializing in React, responsive UI, and motion-rich web applications. Based in Varanasi, India."
        />
      </Helmet>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl space-y-20 px-4 sm:px-6 md:px-8">
          {/* ─── Page Header (matches Projects / Contact / GitHub) ─── */}
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
              33+ Projects Built
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
            >
              About Me
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="text-textColor/60 max-w-xl text-base leading-relaxed"
            >
              Front-End Developer specializing in the React ecosystem — building
              fast, scalable, and motion-rich web applications.
            </motion.p>
            <motion.div
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-gradient-to-r"
            />
          </motion.div>

          {/* ─── Hero: Photo + Bio ─── */}
          <motion.div
            {...sectionReveal(0.1)}
            className="flex flex-col items-center gap-12 lg:flex-row lg:items-start"
          >
            {/* Profile Photo */}
            <div className="group relative shrink-0">
              <div className="box border-accentColor overflow-hidden border-4">
                <img
                  src={profile_pic}
                  alt="Shiv Shankar Singh"
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="bg-accentColor/10 group-hover:bg-accentColor/20 absolute -inset-4 z-[-1] rounded-full blur-2xl transition-all duration-500" />
            </div>

            {/* Bio */}
            <div className="flex flex-1 flex-col gap-6 text-center lg:text-left">
              <div className="space-y-4">
                <p className="text-textColor/80 text-lg leading-relaxed">
                  Hi, I&apos;m{" "}
                  <span className="font-bold text-white">
                    Shiv Shankar Singh
                  </span>
                  , a Front-End Developer based in{" "}
                  <span className="text-accentColor font-medium">
                    Varanasi, India.
                  </span>
                </p>
                <p className="text-textColor/70 text-base leading-relaxed">
                  I specialize in the React ecosystem — building responsive,
                  performant web applications with clean architecture and
                  thoughtful UX. My toolkit spans the modern JavaScript stack,
                  from React and Redux on the front end to Node.js and MongoDB
                  on the back end.
                </p>
                <p className="text-textColor/70 text-base leading-relaxed">
                  What excites me most is the intersection of design and
                  engineering — crafting interfaces that feel alive through
                  motion, micro-interactions, and meticulous attention to
                  detail. Every project in this portfolio was built from scratch
                  with that philosophy.
                </p>
              </div>

              {/* Current Focus card */}
              <div className="border-accentColor/10 bg-accentColor/5 flex items-center gap-4 rounded-xl border p-4">
                <div className="bg-accentColor/20 text-accentColor flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg">
                  💡
                </div>
                <div>
                  <p className="text-accentColor text-sm font-bold">
                    Current Focus
                  </p>
                  <p className="text-textColor/60 text-sm">
                    Building full-stack apps with Next.js & exploring 3D web
                    experiences with Three.js.
                  </p>
                </div>
              </div>

              {/* Resume CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://drive.google.com/file/d/1R_YPrT1UbdBq3_5mNJc6c8FTRKIbfhYW/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.button
                    className="bg-accentColor text-mainBg flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(136,192,208,0.25)] hover:brightness-110"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Resume
                  </motion.button>
                </a>
                <Link to="/contact">
                  <motion.button
                    className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Get In Touch
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ─── Code Block + Journey ─── */}
          <motion.div
            {...sectionReveal(0.1)}
            className="grid gap-10 lg:grid-cols-2"
          >
            {/* Code Block */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="border-explorerBorder bg-articleBg/40 overflow-hidden rounded-2xl border p-1 shadow-2xl backdrop-blur-sm"
            >
              <div className="border-explorerBorder bg-articleBg/80 flex items-center gap-2 rounded-t-xl border-b px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-textColor/50 font-mono text-xs">
                  aboutMe.json
                </span>
              </div>
              <div className="font-Inconsolata p-6 text-sm leading-relaxed sm:text-base">
                <div className="flex">
                  <span className="text-purple-400">const</span>&nbsp;
                  <span className="text-blue-400">developer</span>&nbsp;
                  <span className="text-white">=</span>&nbsp;
                  <span className="text-yellow-200">{"{"}</span>
                </div>
                <div className="pl-4">
                  <p>
                    <span className="text-blue-300">name:</span>{" "}
                    <span className="text-green-300">
                      &apos;Shiv Shankar Singh&apos;
                    </span>
                    ,
                  </p>
                  <p>
                    <span className="text-blue-300">role:</span>{" "}
                    <span className="text-green-300">
                      &apos;Frontend Developer&apos;
                    </span>
                    ,
                  </p>
                  <p>
                    <span className="text-blue-300">specialization:</span>{" "}
                    <span className="text-green-300">
                      &apos;React Ecosystem&apos;
                    </span>
                    ,
                  </p>
                  <p>
                    <span className="text-blue-300">location:</span>{" "}
                    <span className="text-green-300">
                      &apos;Varanasi, India&apos;
                    </span>
                    ,
                  </p>
                  <p>
                    <span className="text-blue-300">learning:</span>{" "}
                    <span className="text-yellow-200">[</span>
                    <span className="text-green-300">
                      &apos;Next.js&apos;
                    </span>,{" "}
                    <span className="text-green-300">&apos;Three.js&apos;</span>
                    <span className="text-yellow-200">]</span>,
                  </p>
                  <p>
                    <span className="text-blue-300">coffeeLover:</span>{" "}
                    <span className="text-orange-300">true</span>
                  </p>
                </div>
                <div className="text-yellow-200">{"}"}</div>
              </div>
            </motion.div>

            {/* My Journey */}
            <div className="flex flex-col justify-center gap-6">
              <h2 className="text-accentColor text-2xl font-bold lg:text-3xl">
                My Journey
              </h2>
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-accentColor/20 border-accentColor/40 text-accentColor flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                        {item.year.slice(2)}
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="bg-accentColor/20 mt-1 w-px flex-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-bold text-white">
                        {item.title}
                      </p>
                      <p className="text-textColor/60 mt-0.5 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── What I Do ─── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-8 flex flex-col gap-2"
            >
              <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
                Services
              </span>
              <h2 className="text-textColor text-2xl font-bold md:text-3xl">
                What I Do
              </h2>
              <div className="from-accentColor to-accentColor/30 h-1 w-16 rounded-full bg-gradient-to-r" />
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="border-explorerBorder bg-articleBg/40 hover:border-accentColor/30 hover:bg-articleBg/70 group rounded-2xl border p-6 transition-colors duration-300"
                >
                  <div className="bg-accentColor/10 text-accentColor group-hover:bg-accentColor/20 mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300">
                    {s.icon}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="text-textColor/60 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Tech Stack ─── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-8 flex flex-col gap-2"
            >
              <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
                Stack
              </span>
              <h2 className="text-textColor text-2xl font-bold md:text-3xl">
                My <span className="text-accentColor">Tech Stack</span>
              </h2>
              <div className="from-accentColor to-accentColor/30 h-1 w-16 rounded-full bg-gradient-to-r" />
            </motion.div>
            <BentoSkills />
            <MarqueeSkills />
          </div>

          {/* ─── Education & Certifications ─── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-8 flex flex-col gap-2"
            >
              <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
                Background
              </span>
              <h2 className="text-textColor text-2xl font-bold md:text-3xl">
                Education
              </h2>
              <div className="from-accentColor to-accentColor/30 h-1 w-16 rounded-full bg-gradient-to-r" />
            </motion.div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="border-explorerBorder bg-articleBg/40 hover:border-accentColor/30 group flex flex-col gap-2 rounded-2xl border p-6 transition-colors duration-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white">{edu.degree}</h3>
                      <p className="text-accentColor mt-0.5 text-sm font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="border-accentColor/20 bg-accentColor/10 text-accentColor shrink-0 rounded-full border px-3 py-1 text-xs font-semibold">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-textColor/60 text-sm leading-relaxed">
                    {edu.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Fun Facts ─── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-8 flex flex-col gap-2"
            >
              <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
                Personal
              </span>
              <h2 className="text-textColor text-2xl font-bold md:text-3xl">
                Beyond the Code
              </h2>
              <div className="from-accentColor to-accentColor/30 h-1 w-16 rounded-full bg-gradient-to-r" />
            </motion.div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{ scale: 1.04 }}
                  className="border-explorerBorder bg-articleBg/40 hover:border-accentColor/30 group rounded-2xl border p-5 text-center transition-colors duration-300"
                >
                  <div className="mb-3 text-3xl">{fact.emoji}</div>
                  <p className="mb-1 text-sm font-bold text-white">
                    {fact.label}
                  </p>
                  <p className="text-textColor/50 text-xs leading-relaxed">
                    {fact.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Bottom CTA ─── */}
          <motion.div
            {...sectionReveal(0.1)}
            className="border-textColor/5 border-t pt-10"
          >
            <div className="border-explorerBorder bg-articleBg/40 rounded-2xl border p-8 text-center">
              <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                Let&apos;s build something{" "}
                <span className="text-accentColor">together</span>
              </h3>
              <p className="text-textColor/60 mx-auto mb-6 max-w-md text-base leading-relaxed">
                Whether you have a project in mind or just want to connect —
                I&apos;m always open to new opportunities and conversations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact">
                  <motion.button
                    className="bg-accentColor text-mainBg rounded-xl px-8 py-3 text-sm font-bold shadow-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(136,192,208,0.25)] hover:brightness-110"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Get In Touch
                  </motion.button>
                </Link>
                <Link to="/projects">
                  <motion.button
                    className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 rounded-xl border-2 px-8 py-3 text-sm font-bold transition-all duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View My Work
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Page Navigation */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <PageNavigator />
      </div>
    </HelmetProvider>
  );
}

export default About;

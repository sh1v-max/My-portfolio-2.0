import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageNavigator from "../../components/PageNavigator";
import profile_pic from "../../assets/images/peakpx.jpg";
import resumeFile from "../../assets/docs/resume.pdf";
import BentoSkills from "./BentoSkills";
import MarqueeSkills from "./MarqueeSkills";
import { Icon } from "@iconify/react";

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
    icon: <Icon icon="lucide:monitor" width="22" height="22" />,
    title: "UI Development",
    desc: "Pixel-perfect, responsive interfaces built with React and Tailwind CSS for designs to feel premium on every screen.",
  },
  {
    icon: <Icon icon="lucide:code-2" width="22" height="22" />,
    title: "React Applications",
    desc: "Scalable SPAs with clean state management (Redux / Recoil), client-side routing, and reusable component architecture.",
  },
  {
    icon: <Icon icon="lucide:bar-chart-3" width="22" height="22" />,
    title: "API Integration",
    desc: "Connecting frontends to REST APIs with Axios, handling auth flows (JWT / Firebase), and managing async state gracefully.",
  },
  {
    icon: <Icon icon="lucide:layers" width="22" height="22" />,
    title: "Motion & Interaction",
    desc: "Bringing interfaces to life with Framer Motion — scroll-triggered animations, micro-interactions, and cinematic transitions.",
  },
];

const education = [
  {
    degree: "Lovely Professional University, Punjab",
    institution: "LPU",
    year: "2020 - 2024",
    note: "Completed Bachelor of Computer Science and Engineering (CSE) at LPU, Punjab.",
    points: [
      "Focused on programming, data structures, and full-stack web development.",
      "Participated in technical events and workshops.",
      "Developed academic projects demonstrating React and Node.js skills.",
    ],
  },
  {
    degree: "Tulsi Vidya Niketan, Varanasi",
    institution: "CBSE Board",
    year: "2018 - 2020",
    note: "Completed Class 11th and 12th from an English medium school affiliated with the CBSE Board.",
    points: [
      "Completed higher secondary education (Science stream).",
      "Strengthened logical, analytical, and communication skills.",
      "Focused on mathematics and computer fundamentals.",
    ],
  },
];

const timeline = [
  {
    year: "2026",
    title: "Going Full-Stack",
    desc: "Deep-diving into Node.js, Express, and MongoDB to build complete backend systems. Exploring Ruby on Rails, SQL, and shipping full-stack apps end-to-end.",
  },
  {
    year: "2025",
    title: "Portfolio & Beyond",
    desc: "Shipped this portfolio, exploring Next.js, Three.js, and building increasingly complex UIs.",
  },
  {
    year: "2024",
    title: "Cohort 2.0 & Deployment",
    desc: "Built Node.js backends, integrated MongoDB, deployed apps to Vercel & Firebase. Joined Cohort 2.0.",
  },
  {
    year: "2022",
    title: "JavaScript & React",
    desc: "Learned vanilla JS deeply, then fell into the React ecosystem and never looked back.",
  },
  {
    year: "2020",
    title: "First Line of Code",
    desc: "Started with HTML & CSS, discovered the web was buildable — not magic.",
  },
];

// ─── Education Accordion Component ───────────────────────────
/* eslint-disable react/prop-types */
function EducationAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(
    items.map((_, i) => i), // all expanded by default
  );

  const toggle = (i) => {
    setOpenIndex((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i],
    );
  };

  return (
    <div className="space-y-4">
      {items.map((edu, i) => {
        const isOpen = openIndex.includes(i);
        return (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="border-explorerBorder bg-articleBg/40 overflow-hidden rounded-2xl border transition-colors duration-300"
          >
            {/* Header Row */}
            <div className="flex items-start gap-4 p-5">
              {/* Graduation icon */}
              <div className="bg-accentColor/10 text-accentColor mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                <Icon icon="lucide:graduation-cap" width="18" height="18" />
              </div>

              {/* Title + Year */}
              <div className="min-w-0 flex-1">
                <h3 className="font-bold leading-snug text-white">
                  {edu.degree}
                </h3>
                <p className="text-accentColor mt-0.5 text-sm font-semibold">
                  {edu.institution}
                </p>
                <p className="text-textColor/40 mt-1 text-xs font-medium">
                  {edu.year}
                </p>
              </div>

              {/* Toggle button */}
              <button
                onClick={() => toggle(i)}
                className="border-explorerBorder text-textColor/40 hover:border-accentColor/40 hover:text-accentColor mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200"
                aria-label={isOpen ? "Collapse" : "Expand"}
              >
                <Icon
                  icon={isOpen ? "lucide:chevron-up" : "lucide:chevron-down"}
                  width="14"
                  height="14"
                />
              </button>
            </div>

            {/* Expandable Body */}
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="border-explorerBorder/50 border-t px-5 pb-5 pt-4">
                <p className="text-textColor/60 font-mono text-sm leading-relaxed">
                  {edu.note}
                </p>
                {edu.points && edu.points.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {edu.points.map((pt, j) => (
                      <li
                        key={j}
                        className="text-textColor/55 flex items-start gap-2 text-sm"
                      >
                        <span className="bg-accentColor/60 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────
function About() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | About</title>
        <meta
          name="description"
          content="Shiv Shankar Singh — Full-Stack Developer specializing in React, Node.js, and MongoDB. Building fast, scalable web applications. Based in Varanasi, India."
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
              className="text-textColor/60 text-justify text-base leading-relaxed md:w-1/2"
            >
              Full-Stack Developer specializing in the React ecosystem and Node.js backends, building
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
                  , a Full-Stack Developer based in{" "}
                  <span className="text-accentColor font-medium">
                    Varanasi, India.
                  </span>
                </p>
                <p className="text-textColor/70 text-base leading-relaxed">
                  I specialize in the React ecosystem, building responsive,
                  performant web applications with clean architecture and
                  thoughtful UX. My toolkit spans the modern JavaScript stack,
                  from React and Redux on the front end to Node.js and MongoDB
                  on the back end.
                </p>
                <p className="text-textColor/70 text-base leading-relaxed">
                  What excites me most is the intersection of design and
                  engineering, crafting interfaces that feel alive through
                  motion, micro-interactions, and meticulous attention to
                  detail. Every project in this portfolio was built from scratch
                  with that philosophy.
                </p>
              </div>

              {/* Currently Learning Block */}
              <div className="space-y-4">
                <h3 className="text-accentColor text-lg font-bold">Currently Learning</h3>

                {/* Timeline */}
                <div className="relative space-y-6">
                  {/* MongoDB */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-accentColor/20 text-accentColor flex h-10 w-10 items-center justify-center rounded-full text-lg">
                        🍃
                      </div>
                      <div className="h-12 w-0.5 bg-gradient-to-b from-accentColor/40 to-accentColor/20"></div>
                    </div>
                    <div className="border-accentColor/10 bg-accentColor/5 flex-1 rounded-xl border p-4 pt-2">
                      <p className="text-accentColor text-sm font-bold">
                        MongoDB
                      </p>
                      <p className="text-textColor/60 text-sm">
                        Learning NoSQL database design, schema modeling with Mongoose, and efficient querying patterns.
                      </p>
                    </div>
                  </div>

                  {/* Node / Express */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-accentColor/20 text-accentColor flex h-10 w-10 items-center justify-center rounded-full text-lg">
                        ⚙️
                      </div>
                      <div className="h-12 w-0.5 bg-gradient-to-b from-accentColor/40 to-accentColor/20"></div>
                    </div>
                    <div className="border-accentColor/10 bg-accentColor/5 flex-1 rounded-xl border p-4 pt-2">
                      <p className="text-accentColor text-sm font-bold">
                        Node.js & Express
                      </p>
                      <p className="text-textColor/60 text-sm">
                        Building REST APIs, handling authentication with JWT, and structuring scalable backend services.
                      </p>
                    </div>
                  </div>

                  {/* Ruby & Rails */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-accentColor/20 text-accentColor flex h-10 w-10 items-center justify-center rounded-full text-lg">
                        💎
                      </div>
                      <div className="h-12 w-0.5 bg-gradient-to-b from-accentColor/40 to-accentColor/20"></div>
                    </div>
                    <div className="border-accentColor/10 bg-accentColor/5 flex-1 rounded-xl border p-4 pt-2">
                      <p className="text-accentColor text-sm font-bold">
                        Ruby & Rails
                      </p>
                      <p className="text-textColor/60 text-sm">
                        Diving into Ruby and Rails to expand backend expertise and build scalable applications.
                      </p>
                    </div>
                  </div>

                  {/* Frontend & 3D Web - Bottom */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-accentColor/20 text-accentColor flex h-10 w-10 items-center justify-center rounded-full text-lg">
                        💡
                      </div>
                    </div>
                    <div className="border-accentColor/10 bg-accentColor/5 flex-1 rounded-xl border p-4 pt-2">
                      <p className="text-accentColor text-sm font-bold">
                        Frontend & 3D Web
                      </p>
                      <p className="text-textColor/60 text-sm">
                        Building full-stack apps with Next.js & exploring 3D web
                        experiences with Three.js.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={resumeFile}
                  download="resume.pdf"
                  className="group relative"
                >
                  <motion.button
                    className="bg-accentColor text-mainBg flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(136,192,208,0.25)] hover:brightness-110"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon
                      icon="lucide:download"
                      width="18"
                      height="18"
                      strokeWidth="2.5"
                    />
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
                      &apos;Full-Stack Developer&apos;
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
                    className="flex gap-5"
                  >
                    <div className="flex flex-col items-center pt-0.5">
                      <span className="text-accentColor text-xs font-bold tracking-wider">
                        {item.year}
                      </span>
                      {i < timeline.length - 1 && (
                        <div className="bg-explorerBorder/80 mt-2 w-px flex-1" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="text-sm font-bold text-white">
                        {item.title}
                      </p>
                      <p className="text-textColor/60 mt-1.5 text-sm leading-relaxed">
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
            <EducationAccordion items={education} />
          </div>

          {/* ─── Bottom CTA ─── */}
          <motion.div
            {...sectionReveal(0.1)}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
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

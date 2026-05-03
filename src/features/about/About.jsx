import { useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import react_icon from "../../assets/icons/react_icon.svg";
import html_icon from "../../assets/icons/html_icon.svg";
import css_icon from "../../assets/icons/css_icon.svg";
import js_icon from "../../assets/icons/js_icon.svg";
import tailwind_icon from "../../assets/icons/tw-icon.svg";
import profile_pic from "../../assets/images/peakpx.jpg";

// ─── Orchestration ───────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ─── Motion Hierarchy ────────────────────────────────────
// Hero: strongest entrance — used for above-the-fold hero content
const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Section: default weight — used for mid-page sections
const sectionItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Card: lightest — used for small interactive elements
const cardItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// ─── Directional Variants ────────────────────────────────
const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function About() {
  const techStack = [
    { name: "HTML", icon: html_icon },
    { name: "CSS", icon: css_icon },
    { name: "JavaScript", icon: js_icon },
    { name: "React", icon: react_icon },
    { name: "Tailwind", icon: tailwind_icon },
  ];

  // ─── Scroll-based reveal refs ──────────────────────────
  const codeBlockRef = useRef(null);
  const bioRef = useRef(null);
  const techRef = useRef(null);

  const codeInView = useInView(codeBlockRef, { once: true, margin: "-100px" });
  const bioInView = useInView(bioRef, { once: true, margin: "-100px" });
  const techInView = useInView(techRef, { once: true, margin: "-100px" });

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | About</title>
      </Helmet>

      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        <motion.div
          className="text-textColor mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ─── Hero Section: Photo & Title ─── */}
          <div className="mb-16 flex flex-col items-center gap-12 lg:flex-row lg:items-start">
            {/* Profile image slides in from the left */}
            <motion.div className="group relative" variants={slideLeft}>
              <div className="box border-accentColor overflow-hidden border-4">
                <img
                  src={profile_pic}
                  alt="Shiv Shankar Singh"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              {/* Subtle glow behind blob */}
              <div className="bg-accentColor/10 group-hover:bg-accentColor/20 absolute -inset-4 z-[-1] rounded-full blur-2xl transition-all duration-500" />
            </motion.div>

            {/* Text content slides in from the right */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              variants={slideRight}
            >
              {/* Social Proof Badge */}
              <motion.span
                className="border-accentColor/30 bg-accentColor/10 text-accentColor mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(136,192,208,0.1)]"
                variants={heroItem}
              >
                <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
                33+ Projects Built
              </motion.span>

              <motion.h1
                className="mb-4 text-4xl font-extrabold text-white sm:text-6xl lg:text-7xl"
                variants={heroItem}
              >
                Front-End <span className="text-accentColor">Developer</span>
              </motion.h1>
              <motion.p
                className="text-textColor/80 text-lg leading-relaxed md:text-xl lg:max-w-2xl"
                variants={heroItem}
              >
                Hi, I&apos;m{" "}
                <span className="font-bold text-white">Shiv Shankar Singh</span>
                . A passionate Front-end React Developer based in Varanasi,
                India. 📍
              </motion.p>
            </motion.div>
          </div>

          {/* ─── Content Grid: Code Block + Bio ─── */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Bio as Code Block — scroll-triggered with subtle scale */}
            <motion.div
              ref={codeBlockRef}
              variants={sectionItem}
              initial="hidden"
              animate={codeInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="border-explorerBorder bg-articleBg/40 overflow-hidden rounded-xl border p-1 shadow-2xl backdrop-blur-sm"
            >
              <div className="border-explorerBorder bg-titlebarBg/50 flex items-center gap-2 border-b px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-textColor/50 font-mono text-xs">
                  aboutMe.json
                </span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed sm:text-base">
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
                    <span className="text-blue-300">currentlyBuilding:</span>{" "}
                    <span className="text-green-300">
                      &apos;Premium VSCode Portfolio&apos;
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
                <div className="text-yellow-200">{"};"}</div>
              </div>
            </motion.div>

            {/* Narrative Bio — scroll-triggered */}
            <motion.div
              ref={bioRef}
              variants={sectionItem}
              initial="hidden"
              animate={bioInView ? "visible" : "hidden"}
              className="flex flex-col justify-center gap-6"
            >
              <h2 className="text-accentColor text-2xl font-bold lg:text-3xl">
                My Journey
              </h2>
              <p className="text-textColor/70 text-lg leading-relaxed">
                As a Junior Front-End Developer, I possess an impressive arsenal
                of skills in{" "}
                <span className="font-medium text-white">
                  HTML, CSS, JavaScript, React and Tailwind
                </span>
                . I excel in designing and maintaining responsive websites that
                offer a smooth user experience.
              </p>
              <p className="text-textColor/70 text-lg leading-relaxed">
                I am a team player who thrives in collaborating with
                cross-functional teams to produce outstanding web applications.
                My goal is to translate complex problems into beautiful,
                intuitive, and high-performance digital experiences.
              </p>

              {/* Sub-badge or info */}
              <motion.div
                variants={cardItem}
                className="bg-accentColor/5 border-accentColor/10 mt-4 flex items-center gap-4 rounded-lg border p-4"
              >
                <div className="bg-accentColor/20 text-accentColor flex h-10 w-10 items-center justify-center rounded-full">
                  💡
                </div>
                <div>
                  <p className="text-accentColor text-sm font-bold">
                    Current Focus
                  </p>
                  <p className="text-textColor/60 text-sm">
                    Optimizing user experiences with Motion & Logic.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ─── Tech Stack Section — scroll-triggered + staggered grid ─── */}
          <motion.div
            ref={techRef}
            className="mt-24 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={techInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="mb-12 text-2xl font-bold text-white lg:text-4xl"
              variants={sectionItem}
            >
              My <span className="text-accentColor">Tech Stack</span>
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  className="group flex flex-col items-center gap-3"
                  variants={cardItem}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <div className="bg-articleBg/80 border-explorerBorder group-hover:border-accentColor/50 relative flex h-16 w-16 items-center justify-center rounded-2xl border p-4 shadow-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(136,192,208,0.2)] md:h-20 md:w-20">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-full w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <span className="text-textColor/40 group-hover:text-accentColor text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </HelmetProvider>
  );
}

export default About;


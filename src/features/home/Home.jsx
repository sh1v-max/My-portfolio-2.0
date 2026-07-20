import { Link } from "react-router-dom";
import Illustration from "./Illustration";
import { personal, stats } from "../../data/config";
// import Illustration10X from "./Illustration10X";
// import Illustration20X from "./Illustration20X";
// import Illustration30X from "./Illustration30X";
// import Illustration40X from "./Illustration40X";
// import Illustration100X from "./Illustration100X";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import PageNavigator from "../../components/PageNavigator";

function Home() {
  // staggered text entry variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // cta buttons fade-in after text
  const ctaVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.5 },
    },
  };

  // illustration entrance
  const illustrationVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Home</title>
      </Helmet>

      <div className="flex w-full flex-col">
        <section className="relative flex h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 md:px-8 md:py-12">
          {/* Background Decorative Text */}
          <motion.div
            className="text-bgText absolute left-0 z-0 flex select-none flex-col gap-y-0 px-20 text-[10rem] font-extrabold leading-[0.85] tracking-tighter max-lg:hidden xl:text-[12rem] 2xl:text-[15rem]"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span>I BUILD</span>
            <span>FOR THE</span>
            <span>WEB</span>
          </motion.div>

          {/* ── Main Content Grid ── */}
          <motion.div
            className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:gap-20 lg:grid-cols-2 lg:gap-32 xl:gap-40"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {/* Left: Text Content */}
            <motion.div
              className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              variants={containerVariants}
            >
              {/* Mobile Decorative Glow (Visible only when illustration is hidden) */}
              <div className="bg-accentColor/10 pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] lg:hidden" />

              {/* Status Badge */}
              <motion.div variants={itemVariants}>
                <span className="border-accentColor/20 bg-accentColor/5 text-accentColor mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest sm:text-xs">
                  <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
                  Available for work — frontend, full-stack & backend
                </span>
              </motion.div>

              {/* Main Heading - Contrast Display Typography */}
              <motion.h1
                className="text-textColor mt-8 flex flex-col items-center lg:items-start"
                variants={itemVariants}
              >
                <span
                  className="text-accentColor mb-2 text-xl tracking-wide sm:text-2xl"
                  style={{ fontFamily: "'Satisfy', cursive" }}
                >
                  Hi, I&apos;m
                </span>
                <motion.span
                  className="from-textColor via-textColor to-textColor/50 bg-gradient-to-br bg-clip-text pr-4 pb-2 text-5xl font-black leading-[0.85] tracking-tighter text-transparent sm:text-6xl lg:text-[8rem] xl:text-[10rem]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                >
                  SHIV
                </motion.span>
              </motion.h1>

              {/* Subheading - Bold & Wide */}
              <motion.h2
                className="text-accentColor/80 mb-8 mt-4 text-lg font-bold uppercase tracking-[0.2em] sm:text-xl lg:text-2xl"
                variants={itemVariants}
              >
                {personal.role}
              </motion.h2>

              {/* Description - Focused & Clean */}
              <motion.p
                className="text-textColor/70 mb-12 max-w-2xl text-xl leading-[1.6] md:text-2xl lg:text-3xl"
                style={{ fontFamily: "'Satisfy', cursive" }}
                variants={itemVariants}
              >
                I build{" "}
                <span className="text-textColor font-semibold">fast</span>,{" "}
                <span className="text-textColor font-semibold">scalable</span>,
                and{" "}
                <span className="text-textColor font-semibold">
                  user-focused
                </span>{" "}
                web applications with modern tools and clean code.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-row items-center gap-4 py-4 lg:justify-start"
                variants={ctaVariants}
              >
                <Link to="/projects">
                  <motion.button
                    className="bg-accentColor text-mainBg rounded-xl px-5 py-3 text-xs font-bold shadow-lg transition-all duration-200 ease-out hover:shadow-[0_0_25px_rgba(136,192,208,0.25)] sm:px-8 sm:py-4 sm:text-sm"
                    style={{
                      boxShadow:
                        "0 4px 20px color-mix(in srgb, var(--accentColor) 30%, transparent)",
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View My Work
                  </motion.button>
                </Link>

                <Link to="/contact">
                  <motion.button
                    className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 rounded-xl border-2 px-5 py-3 text-xs font-bold transition-all duration-200 ease-out sm:px-8 sm:py-4 sm:text-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Contact Me
                  </motion.button>
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex items-center gap-3"
                variants={ctaVariants}
              >
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <motion.div
                    className="border-textColor/20 text-textColor/60 hover:border-accentColor hover:text-accentColor flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="mdi:github" width="20" height="20" />
                  </motion.div>
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <motion.div
                    className="border-textColor/20 text-textColor/60 hover:border-accentColor hover:text-accentColor flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="mdi:linkedin" width="20" height="20" />
                  </motion.div>
                </a>
                <a
                  href={personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                >
                  <motion.div
                    className="border-textColor/20 text-textColor/60 hover:border-accentColor hover:text-accentColor flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="simple-icons:leetcode" width="18" height="18" />
                  </motion.div>
                </a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="border-textColor/10 mt-6 flex items-center gap-8 border-t pt-8 text-center sm:gap-12 lg:text-left"
                variants={itemVariants}
              >
                {[
                  { value: stats.projects, label: "Projects" },
                  { value: stats.themes, label: "Themes" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-accentColor text-3xl font-bold sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="text-textColor/50 mt-1 text-[11px] font-bold uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Illustration - Hidden on mobile for maximum focus */}
            <motion.div
              className="relative hidden items-center justify-center lg:flex lg:justify-end"
              variants={illustrationVariants}
            >
              {/* Glow behind illustration */}
              <div
                className="pointer-events-none absolute h-48 w-48 rounded-full opacity-[0.12] blur-[80px] sm:h-72 sm:w-72 md:h-96 md:w-96"
                style={{ background: "var(--accentColor)" }}
              />

              {/* Floating illustration */}
              <motion.div
                className="relative flex w-full max-w-[200px] sm:max-w-sm lg:max-w-lg lg:justify-end xl:max-w-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Illustration />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Page Navigation - Positioned within the zero-scroll viewport */}
          <div className="absolute bottom-20 left-0 right-0 z-20 px-4 md:bottom-8 md:px-8">
            <div className="mx-auto max-w-7xl">
              <PageNavigator />
            </div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
}

export default Home;

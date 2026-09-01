/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Illustration from "./Illustration";
import StatRail from "./StatRail";
import { personal } from "../../data/config";
// import Illustration10X from "./Illustration10X";
// import Illustration20X from "./Illustration20X";
// import Illustration30X from "./Illustration30X";
// import Illustration40X from "./Illustration40X";
// import Illustration100X from "./Illustration100X";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { scrollToId } from "../../lib/lenis";

function Home({ asSection = false }) {
  const shouldReduceMotion = useReducedMotion();

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
      {!asSection && <Helmet><title>Shiv | Home</title></Helmet>}

      <div className="flex w-full flex-col">
        <section className="relative flex h-[82dvh] min-h-140 items-center justify-center overflow-hidden px-4 py-8 sm:px-6 md:px-8 md:py-12">
          {/* Background Decorative Text */}
          <motion.div
            /* Decorative watermark, not content. It is deliberately near the
               background luminance, so it is exempt from the text contrast
               floor — and hidden from assistive tech, which would otherwise
               read "I BUILD FOR THE WEB" as a stray heading before the name. */
            aria-hidden="true"
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
              <div className="bg-accentColor/10 pointer-events-none absolute left-1/2 top-1/2 -z-10 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] lg:hidden" />

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
                  className="text-accentColor mb-2 text-lg font-semibold tracking-wide sm:text-xl"
                >
                  Hi, I&apos;m
                </span>
                <motion.span
                  className="from-textColor via-textColor to-textColor/50 bg-linear-to-br bg-clip-text pr-4 pb-2 text-5xl font-black leading-[0.85] tracking-tighter text-transparent sm:text-6xl lg:text-[8rem] xl:text-[10rem]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                >
                  SHIV
                </motion.span>
              </motion.h1>

              {/* Subheading - Bold & Wide */}
              <motion.h2
                className="text-accentColor mb-8 mt-4 text-lg font-bold uppercase tracking-[0.2em] sm:text-xl lg:text-2xl"
                variants={itemVariants}
              >
                {personal.role}
              </motion.h2>

              {/* Description - Focused & Clean */}
              <motion.p
                className="text-textSecondary mb-12 max-w-2xl text-lg leading-[1.6] md:text-xl lg:text-2xl"
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
                <Link to="/#projects">
                  <motion.button
                    className="bg-accentColor text-mainBg rounded-xl px-5 py-3 text-xs font-bold shadow-lg transition-all duration-200 ease-out hover:shadow-[0_0_25px_color-mix(in_srgb,var(--accentColor)_25%,transparent)] min-h-11 sm:px-8 sm:py-4 sm:text-sm"
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
                    className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 rounded-xl border-2 px-5 py-3 text-xs font-bold transition-all duration-200 ease-out min-h-11 sm:px-8 sm:py-4 sm:text-sm"
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
                    className="border-textColor/20 text-textMuted hover:border-accentColor hover:text-accentColor flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200"
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
                    className="border-textColor/20 text-textMuted hover:border-accentColor hover:text-accentColor flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200"
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
                    className="border-textColor/20 text-textMuted hover:border-accentColor hover:text-accentColor flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="simple-icons:leetcode" width="18" height="18" />
                  </motion.div>
                </a>
              </motion.div>

              {/* Proof line — every figure traces to the sections below it */}
              <motion.div className="mt-8" variants={ctaVariants}>
                <StatRail />
              </motion.div>
            </motion.div>

            {/* Right: Illustration - Hidden on mobile for maximum focus */}
            <motion.div
              className="relative hidden items-center justify-center lg:flex lg:justify-end"
              variants={illustrationVariants}
            >
              {/* Glow behind illustration */}
              <div
                className="pointer-events-none absolute h-48 w-48 rounded-full opacity-12 blur-[80px] sm:h-72 sm:w-72 md:h-96 md:w-96"
                style={{ background: "var(--accentColor)" }}
              />

              {/* Floating illustration */}
              <motion.div
                className="relative flex w-full max-w-50 sm:max-w-sm lg:max-w-lg lg:justify-end xl:max-w-xl"
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                <Illustration />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll cue — the shortened hero leaves the next section
              peeking above the fold; this makes "there's more" explicit. */}
          {asSection && (
            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("about");
              }}
              aria-label="Scroll to About"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
              className="text-textMuted hover:text-accentColor absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
              >
                <Icon icon="lucide:chevron-down" width="22" height="22" />
              </motion.div>
            </motion.a>
          )}
        </section>
      </div>
    </HelmetProvider>
  );
}

export default Home;

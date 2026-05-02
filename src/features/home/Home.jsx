import { Link } from "react-router-dom";
import Illustration from "./Illustration";
import Illustration10X from "./Illustration10X";
import Illustration20X from "./Illustration20X";
import Illustration30X from "./Illustration30X";
import Illustration40X from "./Illustration40X";
import Illustration100X from "./Illustration100X";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";

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

      <div className="flex flex-col w-full">
        <section className="relative flex min-h-[calc(100vh-140px)] items-center justify-center overflow-hidden px-4 py-8 sm:px-8 md:px-16 md:py-12 lg:px-28 lg:py-12">





        {/* Background Decorative Text */}
        <motion.div
          className="absolute left-0 z-0 flex select-none flex-col gap-y-0 text-[10rem] font-extrabold px-20 leading-[0.85] tracking-tighter text-bgText max-lg:hidden xl:text-[12rem] 2xl:text-[15rem]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span>I BUILD</span>
          <span>PRETTY</span>
          <span>WEBSITES</span>
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
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accentColor/20 bg-accentColor/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accentColor" />
                Available for work
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="mt-2 text-5xl font-bold tracking-tight text-textColor sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
              variants={itemVariants}
            >
              Hi, I&apos;m{" "}
              <motion.span
                className="inline-block text-accentColor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
              >
                Shiv
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              className="mb-4 mt-2 text-xl font-semibold text-accentColor/80 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl"
              variants={itemVariants}
            >
              Frontend Developer
            </motion.h2>

            {/* Description with highlighted keywords */}
            <motion.p
              className="mb-8 max-w-lg text-lg leading-relaxed text-textColor/60 md:text-xl xl:text-xl"
              variants={itemVariants}
            >
              I build{" "}
              <span className="font-semibold text-accentColor/90">fast</span>,{" "}
              <span className="font-semibold text-accentColor/90">scalable</span>
              , and{" "}
              <span className="font-semibold text-accentColor/90">
                user-focused
              </span>{" "}
              web applications with modern tools and clean code.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              variants={ctaVariants}
            >
              <Link to="/projects">
                <motion.button
                  className="rounded-xl bg-accentColor px-8 py-3.5 text-lg font-bold text-mainBg shadow-lg transition-all duration-200 ease-out hover:shadow-[0_0_25px_rgba(136,192,208,0.25)] xl:px-8 xl:text-lg"
                  style={{ boxShadow: "0 4px 20px color-mix(in srgb, var(--accentColor) 30%, transparent)" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View My Work
                </motion.button>
              </Link>

              <motion.a
                href="/assets/docs/resume.pdf"
                download
                className="rounded-xl border-2 border-accentColor/40 px-8 py-3.5 text-lg font-bold text-textColor transition-all duration-200 ease-out hover:border-accentColor hover:bg-accentColor/10 xl:px-8 xl:text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume
              </motion.a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="mt-10 flex items-center gap-6 border-t border-textColor/10 pt-6 text-center sm:gap-8 lg:text-left"
              variants={itemVariants}
            >
              {[
                { value: "30+", label: "Projects" },
                { value: "6", label: "Themes" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-3xl font-bold text-accentColor sm:text-4xl xl:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-textColor/50 xl:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={illustrationVariants}
          >
            {/* Glow behind illustration */}
            <div
              className="pointer-events-none absolute h-72 w-72 rounded-full opacity-[0.12] blur-[80px] md:h-96 md:w-96"
              style={{ background: "var(--accentColor)" }}
            />

            {/* Floating illustration */}
            <motion.div
              className="relative w-full max-w-sm lg:max-w-lg xl:max-w-xl"
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

        {/* Next Page Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link to="/about">
            <motion.div
              className="flex cursor-pointer flex-col items-center gap-1 transition-colors duration-200 hover:text-accentColor"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[10px] font-medium uppercase tracking-widest text-textColor/40">
                next page
              </span>
              <svg
                className="h-4 w-4 text-textColor/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 7l5 5-5 5" />
              </svg>
            </motion.div>
          </Link>
          </motion.div>
        </section>

        {/* ── TEMPORARY SHOWCASE FOR USER REVIEW ── */}
        <section className="relative z-20 flex w-full flex-col items-center justify-center gap-16 border-t border-explorerBorder bg-mainBg/50 py-24 px-4 backdrop-blur-md">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-extrabold text-white">Illustration Showcase</h2>
            <p className="text-lg text-textColor/60">Scroll down to view all versions. Pick the one you like best!</p>
          </div>
          <div className="grid w-full max-w-7xl grid-cols-1 place-items-center gap-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="flex flex-col items-center gap-4"><Illustration /></div>
            <div className="flex flex-col items-center gap-4"><Illustration10X /></div>
            <div className="flex flex-col items-center gap-4"><Illustration20X /></div>
            <div className="flex flex-col items-center gap-4"><Illustration30X /></div>
            <div className="flex flex-col items-center gap-4"><Illustration40X /></div>
            <div className="flex flex-col items-center gap-4"><Illustration100X /></div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
}

export default Home;

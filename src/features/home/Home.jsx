import { Link } from "react-router-dom";
import Illustration from "./Illustration";
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

      <div className="flex w-full flex-col overflow-hidden">
        <section className="relative flex h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-4 sm:px-6 md:px-8">
          {/* Background Decorative Text */}
          <motion.div
            className="text-bgText absolute left-0 z-0 flex select-none flex-col gap-y-0 px-20 text-[10rem] font-extrabold leading-[0.85] tracking-tighter max-lg:hidden xl:text-[12rem] 2xl:text-[15rem]"
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
                <span className="border-accentColor/20 bg-accentColor/5 text-accentColor mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[10px] font-semibold uppercase tracking-widest">
                  <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
                  Available for work
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-textColor mt-1 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                variants={itemVariants}
              >
                Hi, I&apos;m{" "}
                <motion.span
                  className="text-accentColor inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                >
                  Shiv
                </motion.span>
              </motion.h1>

              {/* Subheading */}
              <motion.h2
                className="text-accentColor/80 mb-3 mt-1.5 text-base font-semibold sm:text-lg md:text-xl lg:text-2xl"
                variants={itemVariants}
              >
                Frontend Developer
              </motion.h2>

              {/* Description with highlighted keywords */}
              <motion.p
                className="text-textColor/60 mb-8 max-w-md text-sm leading-relaxed md:text-base lg:text-lg"
                variants={itemVariants}
              >
                I build{" "}
                <span className="text-accentColor/90 font-semibold">fast</span>,{" "}
                <span className="text-accentColor/90 font-semibold">
                  scalable
                </span>
                , and{" "}
                <span className="text-accentColor/90 font-semibold">
                  user-focused
                </span>{" "}
                web applications with modern tools and clean code.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col py-4 items-center gap-4 sm:flex-row lg:justify-start"
                variants={ctaVariants}
              >
                <Link to="/projects">
                  <motion.button
                    className="bg-accentColor text-mainBg rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition-all duration-200 ease-out hover:shadow-[0_0_25px_rgba(136,192,208,0.25)]"
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

                <motion.a
                  href="/assets/docs/resume.pdf"
                  download
                  className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200 ease-out"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download Resume
                </motion.a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="border-textColor/10 mt-4 flex items-center gap-6 border-t pt-5 text-center sm:gap-8 lg:text-left"
                variants={itemVariants}
              >
                {[
                  { value: "30+", label: "Projects" },
                  { value: "6", label: "Themes" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-accentColor text-2xl font-bold sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="text-textColor/50 mt-0.5 text-[10px] font-medium uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Illustration */}
            <motion.div
              className="relative flex items-center justify-center lg:justify-end"
              variants={illustrationVariants}
            >
              {/* Glow behind illustration */}
              <div
                className="pointer-events-none absolute h-72 w-72 rounded-full opacity-[0.12] blur-[80px] md:h-96 md:w-96"
                style={{ background: "var(--accentColor)" }}
              />

              {/* Floating illustration */}
              <motion.div
                className="relative flex w-full max-w-sm lg:max-w-lg lg:justify-end xl:max-w-xl"
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
                className="hover:text-accentColor flex cursor-pointer flex-col items-center gap-1 transition-colors duration-200"
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-textColor/40 text-[10px] font-medium uppercase tracking-widest">
                  next page
                </span>
                <svg
                  className="text-textColor/40 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5-5 5M6 7l5 5-5 5"
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </section>
      </div>
    </HelmetProvider>
  );
}

export default Home;

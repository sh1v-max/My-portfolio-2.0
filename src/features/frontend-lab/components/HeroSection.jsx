import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function HeroSection() {
  return (
    <motion.div 
      variants={headerContainer}
      initial="hidden"
      animate="show"
      className="mb-12 flex flex-col items-start gap-4"
    >
      {/* Badge */}
      <motion.span 
        variants={headerItem}
        className="inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor shadow-[0_0_15px_rgba(136,192,208,0.2)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accentColor animate-pulse" />
        33+ Builds
      </motion.span>

      {/* Title */}
      <motion.h1 
        variants={headerItem}
        className="text-4xl font-extrabold tracking-tight text-textColor sm:text-5xl"
      >
        Frontend Lab
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        variants={headerItem}
        className="text-base leading-relaxed text-textColor/70 text-justify md:w-1/2"
      >
        A collection of UI systems, machine coding challenges, and frontend experiments built to sharpen real-world development skills.
      </motion.p>

      {/* Repository Link */}
      <motion.a
        variants={headerItem}
        href="https://github.com/sh1v-max/Practice-UI-design-React-and-JS"
        target="_blank"
        rel="noreferrer"
        className="mt-2 group inline-flex items-center gap-2 rounded-lg border border-explorerBorder bg-articleBg/50 px-4 py-2.5 text-sm font-semibold text-textColor transition-all duration-300 hover:border-accentColor/50 hover:bg-accentColor/10 hover:text-accentColor active:scale-[0.97]"
      >
        <Icon icon="lucide:github" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        View Full Repository
      </motion.a>

      {/* Decorative gradient line */}
      <motion.div 
        variants={headerItem}
        className="mt-4 h-1 w-20 rounded-full bg-linear-to-r from-accentColor to-transparent opacity-80" 
      />
    </motion.div>
  );
}

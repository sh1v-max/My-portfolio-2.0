import { motion } from "framer-motion";

function Illustration() {
  return (
    <div className="relative flex h-[400px] w-full max-w-[450px] items-center justify-center max-sm:h-[300px]">
      {/* Core Glowing Sphere */}
      <motion.div
        className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full opacity-60 blur-[70px]"
        style={{ background: "var(--accentColor)" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Glassmorphic Terminal Window */}
      <motion.div
        className="border-explorerBorder bg-mainBg/80 relative z-10 flex h-52 w-64 sm:h-64 sm:w-80 flex-col overflow-hidden rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        initial={{ rotateY: -12, rotateX: 5 }}
        animate={{
          y: [0, -10, 0],
          rotateY: [-12, -8, -12],
          rotateX: [5, 2, 5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {/* OS Window Controls */}
        <div className="border-explorerBorder bg-titlebarBg/60 flex items-center gap-2 border-b px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <div className="bg-textColor/10 text-textColor/50 ml-2 rounded px-2 py-0.5 text-[10px]">
            src/Hero.tsx
          </div>
        </div>

        {/* Animated Code Syntax */}
        <div className="flex flex-1 flex-col gap-2.5 sm:gap-3 p-4 sm:p-5 font-mono text-xs sm:text-sm">
          <motion.div
            className="bg-accentColor/70 h-3 w-3/4 rounded-md"
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.div
            className="bg-textColor/40 h-3 w-1/2 rounded-md"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.div
            className="bg-textColor/20 h-3 w-5/6 rounded-md"
            initial={{ width: 0 }}
            animate={{ width: "83%" }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.div
            className="bg-accentColor/50 mt-3 h-3 w-1/3 rounded-md"
            initial={{ width: 0 }}
            animate={{ width: "33%" }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.div
            className="bg-textColor/40 h-3 w-2/3 rounded-md"
            initial={{ width: 0 }}
            animate={{ width: "66%" }}
            transition={{ duration: 1, delay: 1 }}
          />
          <div className="mt-auto flex items-center gap-2">
            <span className="bg-accentColor h-2 w-2 animate-pulse rounded-full" />
            <span className="text-textColor/40 text-xs">Compiling...</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Widget 1 - Code Brackets */}
      <motion.div
        className="border-explorerBorder bg-articleBg/90 absolute -right-2 top-2 sm:-right-4 sm:top-8 z-20 flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border shadow-2xl backdrop-blur-md"
        animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
        transition={{
          duration: 5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="text-accentColor h-7 w-7 sm:h-10 sm:w-10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
      </motion.div>

      {/* Floating Widget 2 - Performance/Lightning */}
      <motion.div
        className="border-explorerBorder bg-articleBg/90 absolute -left-4 bottom-4 sm:-left-12 sm:bottom-16 z-20 flex h-14 w-32 sm:h-16 sm:w-40 items-center gap-2 sm:gap-3 rounded-2xl border p-2 sm:p-3 shadow-2xl backdrop-blur-md"
        animate={{ y: [0, -12, 0], x: [0, -5, 0] }}
        transition={{
          duration: 6,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="bg-accentColor/10 text-accentColor flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="bg-textColor/60 h-2 w-full rounded" />
          <div className="bg-textColor/30 h-2 w-2/3 rounded" />
        </div>
      </motion.div>

      {/* Decorative Orbiting Ring */}
      <motion.div
        className="border-accentColor/40 absolute -bottom-4 right-10 z-0 h-16 w-16 rounded-full border-2 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Decorative Plus Signs */}
      <div className="text-accentColor/30 absolute right-0 top-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="text-accentColor/30 absolute bottom-0 left-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
    </div>
  );
}

export default Illustration;

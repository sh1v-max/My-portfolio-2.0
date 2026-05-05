import { motion } from "framer-motion";

export default function ThemeIllustration({ open }) {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center overflow-visible cursor-pointer md:h-20 md:w-20">
      {/* Outer Rotating Data Ring */}
      <motion.div
        className="absolute h-full w-full rounded-full border border-accentColor/20 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary Pulse Ring */}
      <motion.div
        className="absolute h-10 w-10 rounded-full border-2 border-accentColor/40 md:h-16 md:w-16"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: -360,
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hexagonal Core Container */}
      <motion.div
        className="relative z-10 flex h-7 w-7 items-center justify-center md:h-10 md:w-10"
        animate={{
          rotate: open ? 180 : 0,
          scale: open ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Core Glow */}
        <div className="absolute h-6 w-6 rounded-full bg-accentColor opacity-40 blur-md md:h-8 md:w-8" />
        
        {/* Hexagon Shape */}
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-accentColor drop-shadow-[0_0_8px_rgba(var(--accentColor-rgb),0.5)] md:h-8 md:w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11z" />
          <path d="M12 22V12" />
          <path d="M12 12l9-4.5" />
          <path d="M12 12L3 7.5" />
        </svg>

        {/* Floating Data Bits */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accentColor"
            animate={{
              x: [0, Math.cos(i * 120) * 15, 0],
              y: [0, Math.sin(i * 120) * 15, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

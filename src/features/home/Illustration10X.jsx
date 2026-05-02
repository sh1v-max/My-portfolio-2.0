import { motion } from "framer-motion";

export default function Illustration10X() {
  return (
    <div className="relative flex h-[400px] w-full max-w-[450px] items-center justify-center">
      <div className="absolute text-textColor/50 top-0 text-sm font-bold">10X - Orbital System</div>
      
      {/* Central Glow */}
      <motion.div
        className="absolute h-32 w-32 rounded-full opacity-80 blur-[40px]"
        style={{ background: "var(--accentColor)" }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit 1 */}
      <motion.div
        className="absolute h-64 w-64 rounded-full border border-accentColor/30"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-accentColor shadow-[0_0_15px_var(--accentColor)]" />
      </motion.div>

      {/* Orbit 2 */}
      <motion.div
        className="absolute h-48 w-48 rounded-full border border-dashed border-textColor/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 -left-2 h-4 w-4 -translate-y-1/2 rounded-full bg-textColor/50" />
      </motion.div>

      {/* Center Core */}
      <motion.div
        className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-mainBg border border-explorerBorder shadow-2xl backdrop-blur-md"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-8 w-8 text-accentColor">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";

export default function Illustration40X() {
  return (
    <div className="relative flex h-100 w-full max-w-112.5 items-center justify-center">
      <div className="absolute text-textColor/50 top-0 text-sm font-bold z-50">40X - Neural Network</div>

      {/* SVG Network Lines */}
      <svg className="absolute inset-0 h-full w-full opacity-40">
        <motion.path
          d="M100 100 Q 200 150 350 100 T 400 300"
          fill="none"
          stroke="var(--accentColor)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M50 300 Q 200 200 350 350"
          fill="none"
          stroke="var(--textColor)"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Nodes */}
      <motion.div className="absolute left-20 top-20 h-10 w-10 rounded-xl bg-articleBg border border-explorerBorder shadow-[0_0_20px_var(--accentColor)] flex items-center justify-center animate-pulse">
        <div className="h-3 w-3 bg-accentColor rounded-full" />
      </motion.div>
      <motion.div className="absolute right-20 top-20 h-14 w-14 rounded-full bg-mainBg border-2 border-accentColor/50 flex items-center justify-center" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-xs text-accentColor">API</span>
      </motion.div>
      <motion.div className="absolute left-7.5 bottom-20 h-12 w-12 rounded-lg bg-accentColor/20 border border-accentColor flex items-center justify-center backdrop-blur-md">
        <span className="text-xs text-white">DB</span>
      </motion.div>
      <motion.div className="absolute right-12.5 bottom-12.5 h-16 w-16 rounded-full bg-articleBg border border-explorerBorder flex items-center justify-center shadow-xl">
        <div className="h-6 w-6 text-textColor">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
      </motion.div>

      {/* Giant central glass orb */}
      <motion.div
        className="z-10 h-40 w-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_0_50px_rgba(136,192,208,0.2)] flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, linear: true }}
      >
        <div className="h-20 w-20 rounded-full border-4 border-dashed border-accentColor/50" />
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";

export default function Illustration20X() {
  return (
    <div className="relative flex h-100 w-full max-w-112.5 items-center justify-center">
      <div className="absolute text-textColor/50 top-0 text-sm font-bold">20X - Isometric Layers</div>

      <motion.div
        className="relative flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateX: 60, rotateZ: -45 }}
        animate={{ rotateZ: [-45, -35, -45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Layer 1 (Bottom) */}
        <motion.div
          className="absolute h-48 w-48 rounded-xl border-2 border-accentColor/20 bg-accentColor/5 backdrop-blur-sm"
          animate={{ z: [-40, -60, -40] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Layer 2 (Middle) */}
        <motion.div
          className="absolute h-48 w-48 rounded-xl border-2 border-accentColor/50 bg-mainBg/60 shadow-[0_0_30px_rgba(136,192,208,0.2)] backdrop-blur-md"
          animate={{ z: [0, 0, 0] }}
        >
          <div className="flex h-full w-full flex-col gap-3 p-4">
            <div className="h-4 w-3/4 rounded bg-accentColor/30" />
            <div className="h-4 w-1/2 rounded bg-textColor/20" />
            <div className="h-4 w-full rounded bg-textColor/10" />
          </div>
        </motion.div>

        {/* Layer 3 (Top) */}
        <motion.div
          className="absolute h-48 w-48 rounded-xl border-2 border-accentColor bg-accentColor/10 shadow-[0_0_50px_var(--accentColor)] backdrop-blur-lg flex items-center justify-center"
          animate={{ z: [40, 60, 40] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-16 w-16 text-accentColor">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

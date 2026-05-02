import { motion } from "framer-motion";

export default function Illustration100X() {
  return (
    <div className="relative flex h-[400px] w-full max-w-[450px] items-center justify-center overflow-visible">
      <div className="absolute text-textColor/50 -top-6 text-sm font-bold z-50">100X - GOD TIER SCI-FI HUD</div>

      {/* Deep Background Glow */}
      <motion.div
        className="absolute h-[120%] w-[120%] rounded-full opacity-30 blur-[100px]"
        style={{ background: "var(--accentColor)" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Container 3D */}
      <motion.div
        className="relative z-10 flex h-72 w-72 items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: [20, 30, 20], rotateY: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Core Geometric Cube */}
        <motion.div
          className="absolute h-32 w-32 border-2 border-accentColor bg-accentColor/10 shadow-[0_0_50px_var(--accentColor)] backdrop-blur-md"
          animate={{ rotateZ: 360, rotateX: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Offset Geometric Cube */}
        <motion.div
          className="absolute h-32 w-32 border border-textColor/50 bg-transparent"
          animate={{ rotateZ: -360, rotateY: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* HUD Data Rings */}
        <motion.div
          className="absolute h-64 w-64 rounded-full border-[10px] border-dashed border-accentColor/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-56 w-56 rounded-full border-l-4 border-r-4 border-textColor/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Data Panels */}
        <motion.div
          className="absolute -right-20 top-10 flex h-32 w-24 flex-col gap-2 rounded-lg border border-accentColor/40 bg-black/40 p-3 backdrop-blur-xl"
          animate={{ z: 50, y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-[8px] text-accentColor tracking-widest">SYS.STATUS</div>
          <div className="h-1 w-full bg-accentColor" />
          <div className="flex gap-1 mt-auto">
            <motion.div className="h-8 w-2 bg-accentColor" animate={{ height: ["10%", "90%", "30%"] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.div className="h-8 w-2 bg-accentColor" animate={{ height: ["40%", "20%", "100%"] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <motion.div className="h-8 w-2 bg-accentColor" animate={{ height: ["80%", "50%", "20%"] }} transition={{ duration: 0.8, repeat: Infinity }} />
            <motion.div className="h-8 w-2 bg-accentColor" animate={{ height: ["20%", "100%", "60%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>

        <motion.div
          className="absolute -left-20 bottom-10 flex h-20 w-32 items-center justify-center rounded-lg border border-textColor/30 bg-black/40 backdrop-blur-xl"
          animate={{ z: 80, x: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="text-center font-mono text-xl font-black text-white mix-blend-overlay">
            100<span className="text-accentColor">X</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Target Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-full w-[1px] bg-textColor" />
        <div className="absolute h-[1px] w-full bg-textColor" />
      </div>
    </div>
  );
}

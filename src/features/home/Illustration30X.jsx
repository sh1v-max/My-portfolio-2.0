import { motion } from "framer-motion";

export default function Illustration30X() {
  return (
    <div className="relative flex h-[400px] w-full max-w-[450px] items-center justify-center">
      <div className="absolute text-textColor/50 top-0 text-sm font-bold">30X - Holographic Matrix</div>

      <motion.div
        className="relative h-72 w-56 overflow-hidden rounded-2xl border-2 border-accentColor/40 bg-articleBg/60 shadow-[0_0_40px_var(--accentColor)] backdrop-blur-xl"
        initial={{ rotateY: 15, rotateX: 5 }}
        animate={{ rotateY: [15, -15, 15], y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Scanning Laser */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-accentColor shadow-[0_0_20px_var(--accentColor)]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="flex flex-col gap-4 p-6 opacity-80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-accentColor/50" />
              <motion.div
                className="h-2 rounded bg-textColor/30"
                style={{ width: `${Math.random() * 50 + 30}%` }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            </div>
          ))}
        </div>

        {/* Floating Code badge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-accentColor bg-accentColor/20 px-4 py-1 text-xs font-bold text-accentColor tracking-widest backdrop-blur-md">
          SYSTEM ACTIVE
        </div>
      </motion.div>

      {/* Data particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-accentColor"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

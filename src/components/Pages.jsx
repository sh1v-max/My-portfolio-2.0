import { Outlet, useNavigation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Pages() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="relative flex-1">
      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--textColor) 1px, transparent 1px), linear-gradient(90deg, var(--textColor) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Loading Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-50 h-[2px] origin-left bg-accentColor"
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Pages;

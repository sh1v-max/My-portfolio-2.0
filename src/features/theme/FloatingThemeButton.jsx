import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import ThemeIllustration from "./ThemeIllustration";

const themes = [
  {
    name: "Midnight Velvet",
    key: "dracula",
    colors: ["#282a36", "#bd93f9", "#efefef"],
  },
  {
    name: "Nocturnal Echo",
    key: "nightOwl",
    colors: ["#011627", "#5f7e97", "#89a4bb"],
  },
  {
    name: "Code Abyss",
    key: "github",
    colors: ["#24292e", "#f9826c", "#efefef"],
  },
  {
    name: "Polar Breeze",
    key: "nord",
    colors: ["#2e3440", "#88c0d0", "#efefef"],
  },
  {
    name: "Golden Mirage",
    key: "ayuMirage",
    colors: ["#1f2430", "#e6b450", "#efefef"],
  },
  {
    name: "Stellar Onyx",
    key: "ayuDark",
    colors: ["#0a0e14", "#e6b450", "#efefef"],
  },
];

function FloatingThemeButton() {
  const { theme: currentTheme, changeTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 left-4 z-50 md:bottom-12 md:left-12"
    >
      {/* ─── Expanded Theme Menu ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-explorerBorder/50 bg-mainBg/95 absolute bottom-16 left-0 flex flex-col gap-2 rounded-2xl border p-3 shadow-2xl backdrop-blur-xl md:bottom-24"
          >
            <span className="text-textColor/30 px-1 text-[10px] font-semibold uppercase tracking-widest">
              Themes
            </span>
            {themes.map((t, i) => {
              const isActive = currentTheme === t.key;
              return (
                <motion.button
                  key={t.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  onClick={() => {
                    changeTheme(t.key);
                    setOpen(false);
                  }}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200 ${
                    isActive
                      ? "bg-accentColor/15"
                      : "hover:bg-explorerBorder/20"
                  }`}
                  aria-label={`Apply ${t.name} theme`}
                >
                  {/* Color swatch */}
                  <div className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center">
                    <div
                      className={`h-7 w-7 overflow-hidden rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? "border-accentColor shadow-[0_0_8px_rgba(136,192,208,0.3)]"
                          : "border-explorerBorder/50 group-hover:border-textColor/30"
                      }`}
                    >
                      {/* 3-color pie */}
                      <div className="flex h-full w-full">
                        <div
                          className="h-full w-1/3"
                          style={{ backgroundColor: t.colors[0] }}
                        />
                        <div
                          className="h-full w-1/3"
                          style={{ backgroundColor: t.colors[1] }}
                        />
                        <div
                          className="h-full w-1/3"
                          style={{ backgroundColor: t.colors[2] }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <span
                    className={`whitespace-nowrap text-xs font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-accentColor"
                        : "text-textColor/60 group-hover:text-textColor"
                    }`}
                  >
                    {t.name}
                  </span>

                  {/* Active dot */}
                  {isActive && (
                    <div className="bg-accentColor ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main Floating Button ─── */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center transition-all duration-300"
        aria-label="Toggle theme selector"
      >
        <ThemeIllustration open={open} />
      </motion.button>
    </div>
  );
}

export default FloatingThemeButton;

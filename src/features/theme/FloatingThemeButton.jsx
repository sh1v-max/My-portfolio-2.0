import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const themes = [
  { name: "Midnight Velvet", key: "dracula",   colors: ["#282a36", "#bd93f9", "#efefef"] },
  { name: "Nocturnal Echo",  key: "nightOwl",  colors: ["#011627", "#5f7e97", "#89a4bb"] },
  { name: "Code Abyss",      key: "github",    colors: ["#24292e", "#f9826c", "#efefef"] },
  { name: "Polar Breeze",    key: "nord",      colors: ["#2e3440", "#88c0d0", "#efefef"] },
  { name: "Golden Mirage",   key: "ayuMirage", colors: ["#1f2430", "#e6b450", "#efefef"] },
  { name: "Stellar Onyx",    key: "ayuDark",   colors: ["#0a0e14", "#e6b450", "#efefef"] },
];

function ThemeToggle() {
  const { theme: currentTheme, changeTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const activeTheme = themes.find((t) => t.key === currentTheme) ?? themes[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* ─── Trigger button — compact swatch ─── */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        aria-expanded={open}
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accentColor ${
          open
            ? "bg-accentColor/10"
            : "hover:bg-explorerBorder/25"
        }`}
      >
        {/* 3-color swatch represents the active theme */}
        <div
          className={`h-6 w-6 overflow-hidden rounded-full border-2 transition-all duration-200 ${
            open
              ? "border-accentColor shadow-[0_0_8px_color-mix(in_srgb,var(--color-accentColor)_40%,transparent)]"
              : "border-explorerBorder/60"
          }`}
        >
          <div className="flex h-full w-full">
            {activeTheme.colors.map((color, i) => (
              <div key={i} className="h-full w-1/3" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </motion.button>

      {/* ─── Dropdown — opens downward, right-aligned ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -6 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-explorerBorder/50 bg-mainBg/96 absolute right-0 top-full z-50 mt-2 flex w-52 flex-col gap-1 rounded-2xl border p-2 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            <span className="text-textColor/30 px-2 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest">
              Themes
            </span>
            {themes.map((t, i) => {
              const isActive = currentTheme === t.key;
              return (
                <motion.button
                  key={t.key}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.15 }}
                  onClick={() => {
                    changeTheme(t.key);
                    setOpen(false);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-150 ${
                    isActive
                      ? "bg-accentColor/10"
                      : "hover:bg-explorerBorder/20"
                  }`}
                  aria-label={`Apply ${t.name} theme`}
                >
                  {/* Color swatch */}
                  <div
                    className={`h-6 w-6 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-200 ${
                      isActive
                        ? "border-accentColor shadow-[0_0_6px_color-mix(in_srgb,var(--color-accentColor)_35%,transparent)]"
                        : "border-explorerBorder/50 group-hover:border-textColor/30"
                    }`}
                  >
                    <div className="flex h-full w-full">
                      {t.colors.map((color, ci) => (
                        <div key={ci} className="h-full w-1/3" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <span
                    className={`flex-1 whitespace-nowrap text-xs font-medium transition-colors duration-150 ${
                      isActive
                        ? "text-accentColor"
                        : "text-textColor/60 group-hover:text-textColor"
                    }`}
                  >
                    {t.name}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="bg-accentColor h-1.5 w-1.5 shrink-0 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeToggle;

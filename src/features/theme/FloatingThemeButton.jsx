import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useTheme } from "../../context/ThemeContext";

// ── Physics constants ─────────────────────────────────────────────────────────
const SPRING_SNAPPY = { type: "spring", damping: 22, stiffness: 380, mass: 0.8 };
const SPRING_SOFT   = { type: "spring", damping: 28, stiffness: 240, mass: 1 };
const EASE_EXPO     = [0.16, 1, 0.3, 1];

// ── Stagger variants — dropdown rows blur+slide in ────────────────────────────
const listVariants = {
  hidden: {},
  show:  { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
  exit:  { transition: { staggerChildren: 0.022, staggerDirection: -1 } },
};
const rowVariants = {
  hidden: { opacity: 0, x: 18, filter: "blur(8px)" },
  show:   { opacity: 1, x: 0,  filter: "blur(0px)", transition: { ...SPRING_SNAPPY } },
  exit:   { opacity: 0, x: 10, filter: "blur(4px)", transition: { duration: 0.11 } },
};

// ── Theme colour palette (exact values from index.css) ────────────────────────
const themes = [
  {
    name: "Midnight Velvet", key: "dracula",
    colors: ["#282a36", "#bd93f9", "#efefef"],
    p: { bg: "#282a36", card: "#21222c", accent: "#bd93f9", text: "#efefef" },
  },
  {
    name: "Nocturnal Echo", key: "nightOwl",
    colors: ["#011627", "#5f7e97", "#89a4bb"],
    p: { bg: "#011627", card: "#031d33", accent: "#5f7e97", text: "#89a4bb" },
  },
  {
    name: "Code Abyss", key: "github",
    colors: ["#24292e", "#f9826c", "#efefef"],
    p: { bg: "#24292e", card: "#1f2428", accent: "#f9826c", text: "#efefef" },
  },
  {
    name: "Polar Breeze", key: "nord",
    colors: ["#2e3440", "#88c0d0", "#efefef"],
    p: { bg: "#2e3440", card: "#363f50", accent: "#88c0d0", text: "#efefef" },
  },
  {
    name: "Golden Mirage", key: "ayuMirage",
    colors: ["#1f2430", "#e6b450", "#efefef"],
    p: { bg: "#1f2430", card: "#252e3d", accent: "#e6b450", text: "#efefef" },
  },
  {
    name: "Stellar Onyx", key: "ayuDark",
    colors: ["#0a0e14", "#e6b450", "#efefef"],
    p: { bg: "#0a0e14", card: "#10121a", accent: "#e6b450", text: "#efefef" },
  },
];

// ── Mini portfolio mockup ─────────────────────────────────────────────────────
// No remounting — structure stays alive, CSS transitions morph all colour values.
const C = "background-color 0.42s ease, color 0.42s ease, border-color 0.42s ease, box-shadow 0.42s ease";

function MiniMockup({ p, name }) {
  const [copied, setCopied] = useState(null);

  const copyHex = (label, hex) => {
    navigator.clipboard.writeText(hex.toUpperCase());
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const brd = (alpha = "22") => ({
    borderWidth: 1, borderStyle: "solid",
    borderColor: `${p.accent}${alpha}`,
    transition: C,
  });

  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ background: p.bg, transition: C }}>

      {/* ── Mini navbar ── */}
      <div
        className="flex h-9 shrink-0 items-center gap-2 px-3"
        style={{ background: p.card, ...brd(), borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
      >
        <div className="flex flex-col gap-[3.5px]">
          {[12, 8, 12].map((w, i) => (
            <div key={i} style={{ background: p.text, transition: C, opacity: i === 1 ? 0.32 : 0.62, width: w, height: 1.5 }} className="rounded-full" />
          ))}
        </div>
        <span style={{ color: p.text, transition: C, opacity: 0.38, fontSize: 6, letterSpacing: "0.13em", fontWeight: 700, textTransform: "uppercase" }}>
          Menu
        </span>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <span style={{ color: p.text, transition: C, fontSize: 8, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.22em" }}>
            SHIV<span style={{ color: p.accent, transition: C }}>.</span>
          </span>
        </div>
        <div style={{ background: p.accent, transition: C, height: 16, width: 40, borderRadius: 6, opacity: 0.9 }} />
      </div>

      {/* ── Hero ── */}
      <div className="flex flex-col gap-1.5 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <div style={{ background: p.accent, transition: C, height: 1.5, width: 14, borderRadius: 4 }} />
          <span style={{ color: p.accent, transition: C, fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            Full-Stack Dev
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div style={{ background: p.text, transition: C, height: 9, width: "78%", borderRadius: 4, opacity: 0.88 }} />
          <div style={{ background: p.text, transition: C, height: 9, width: "57%", borderRadius: 4, opacity: 0.88 }} />
        </div>
        <div className="flex flex-col gap-1">
          <div style={{ background: p.text, transition: C, height: 5, width: "92%", borderRadius: 99, opacity: 0.2 }} />
          <div style={{ background: p.text, transition: C, height: 5, width: "74%", borderRadius: 99, opacity: 0.2 }} />
        </div>
        <div className="flex gap-2">
          <div style={{ background: p.accent, transition: C, height: 18, width: 58, borderRadius: 6, opacity: 0.9 }} />
          <div style={{ background: p.text,   transition: C, height: 18, width: 44, borderRadius: 6, opacity: 0.09 }} />
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="flex gap-2 px-4">
        {[0.68, 0.5, 0.58].map((accOp, i) => (
          <div key={i} className="flex flex-1 flex-col gap-1 rounded-lg p-1.5" style={{ background: p.card, transition: C, ...brd() }}>
            <div style={{ background: p.accent, transition: C, height: 4, width: "55%", borderRadius: 99, opacity: accOp }} />
            <div style={{ background: p.text,   transition: C, height: 4, width: "80%", borderRadius: 99, opacity: 0.28 }} />
            <div style={{ background: p.text,   transition: C, height: 4, width: "60%", borderRadius: 99, opacity: 0.17 }} />
          </div>
        ))}
      </div>

      {/* ── Palette tokens ── */}
      <div
        className="mx-3 mt-2 grid grid-cols-2 gap-x-2 gap-y-1 rounded-xl p-2"
        style={{ background: `${p.text}07`, transition: C, ...brd("0d") }}
      >
        {[
          { label: "BG",     hex: p.bg     },
          { label: "ACCENT", hex: p.accent  },
          { label: "CARD",   hex: p.card    },
          { label: "TEXT",   hex: p.text    },
        ].map(({ label, hex }) => {
          const isCopied = copied === label;
          return (
            <div key={label} className="flex items-center gap-1.5">
              <div style={{
                background: hex, transition: C,
                width: 9, height: 9, borderRadius: 3, flexShrink: 0,
                border: "1px solid rgba(255,255,255,0.13)",
                boxShadow: `0 0 0 1px ${hex}40`,
              }} />
              <div className="flex flex-col" style={{ gap: 1, flex: 1 }}>
                <span style={{ color: p.text, transition: C, opacity: 0.32, fontSize: 5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", lineHeight: 1 }}>
                  {label}
                </span>
                <span style={{ color: p.accent, transition: C, fontSize: 6, fontWeight: 700, letterSpacing: "0.04em", fontFamily: "monospace", lineHeight: 1, opacity: 0.9 }}>
                  {hex.toUpperCase()}
                </span>
              </div>
              <motion.button
                onClick={() => copyHex(label, hex)}
                whileTap={{ scale: 0.8 }}
                title="Copy hex"
                style={{
                  background: isCopied ? `${p.accent}28` : "transparent",
                  border: `1px solid ${isCopied ? p.accent + "50" : "transparent"}`,
                  borderRadius: 4, padding: "2px 3px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, border-color 0.2s",
                  flexShrink: 0,
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isCopied ? (
                    <motion.span key="check"
                      initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                      style={{ color: p.accent, fontSize: 7, lineHeight: 1 }}
                    >✓</motion.span>
                  ) : (
                    <motion.span key="icon"
                      initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Icon icon="lucide:copy" style={{ color: p.text, opacity: 0.35, width: 7, height: 7 }} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div
        className="mt-auto flex shrink-0 items-center justify-between px-3 py-1.5"
        style={{ ...brd(), borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
      >
        <span style={{ color: p.text, transition: C, opacity: 0.36, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          {name}
        </span>
        <div className="flex gap-1">
          {[p.bg, p.card, p.accent, p.text].map((c, i) => (
            <div key={i} style={{ background: c, transition: C, width: 10, height: 10, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme: currentTheme, changeTheme } = useTheme();
  const [open, setOpen]             = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [spinCount, setSpinCount]   = useState(0);
  const containerRef     = useRef(null);
  const inactivityRef    = useRef(null);
  const clearHoverTimer  = useRef(null);

  const scheduleHoverClear = () => {
    clearTimeout(clearHoverTimer.current);
    clearHoverTimer.current = setTimeout(() => setHoveredKey(null), 200);
  };
  const cancelHoverClear = () => clearTimeout(clearHoverTimer.current);

  const activeTheme  = themes.find((t) => t.key === currentTheme) ?? themes[0];
  const hoveredTheme = themes.find((t) => t.key === hoveredKey)   ?? null;

  const closeAll = () => {
    setOpen(false);
    setHoveredKey(null);
    clearTimeout(inactivityRef.current);
  };

  const startInactivityTimer = () => {
    clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(closeAll, 3000);
  };

  const cancelInactivityTimer = () => {
    clearTimeout(inactivityRef.current);
  };

  // Outside-click to close
  useEffect(() => {
    function onOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeAll();
      }
    }
    if (open) {
      document.addEventListener("mousedown", onOutsideClick);
      return () => document.removeEventListener("mousedown", onOutsideClick);
    }
  }, [open]);

  // Scroll to close immediately
  useEffect(() => {
    if (!open) return;
    const onScroll = () => closeAll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(inactivityRef.current), []);

  const handleThemeChange = (key) => {
    if (key !== currentTheme) setSpinCount((c) => c + 1);
    changeTheme(key);
    setOpen(false);
    setHoveredKey(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={cancelInactivityTimer}
      onMouseLeave={() => open && startInactivityTimer()}
    >

      {/* ─── Trigger — swatch spins on theme change ─── */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        aria-expanded={open}
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accentColor ${
          open ? "bg-accentColor/10" : "hover:bg-explorerBorder/25"
        }`}
      >
        <motion.div
          className={`h-6 w-6 overflow-hidden rounded-full border-2 transition-all duration-300 ${
            open
              ? "border-accentColor shadow-[0_0_12px_color-mix(in_srgb,var(--color-accentColor)_45%,transparent)]"
              : "border-explorerBorder/60"
          }`}
          animate={{ rotate: spinCount * 360 }}
          transition={SPRING_SOFT}
        >
          <div className="flex h-full w-full">
            {activeTheme.colors.map((color, i) => (
              <div key={i} className="h-full w-1/3" style={{ backgroundColor: color }} />
            ))}
          </div>
        </motion.div>
      </motion.button>

      {/* ─── Dropdown ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: -12 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{   opacity: 0, scale: 0.90,  y: -8 }}
            transition={{ ...SPRING_SNAPPY }}
            style={{ transformOrigin: "top right" }}
            className="border-explorerBorder/50 bg-mainBg/96 absolute right-0 top-full z-50 mt-2 flex w-52 flex-col gap-1 rounded-2xl border p-2 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >

            {/* ─── Preview panel ─── */}
            <AnimatePresence>
              {hoveredTheme && (
                <motion.div
                  initial={{ opacity: 0, x: 18, scale: 0.93 }}
                  animate={{ opacity: 1, x: 0,  scale: 1 }}
                  exit={{   opacity: 0, x: 14,  scale: 0.95 }}
                  transition={{ ...SPRING_SOFT }}
                  onMouseEnter={cancelHoverClear}
                  onMouseLeave={scheduleHoverClear}
                  className="absolute right-full top-0 bottom-0 mr-3 w-72 overflow-hidden rounded-2xl"
                  style={{
                    border: `1px solid ${hoveredTheme.p.accent}28`,
                    boxShadow: `0 0 0 1px ${hoveredTheme.p.accent}10, 0 28px 72px rgba(0,0,0,0.7)`,
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Shimmer — sweeps once on panel mount */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20"
                    style={{ background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)" }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "160%" }}
                    transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.06 }}
                  />

                  {/* Scan line — sweeps top→bottom once */}
                  <motion.div
                    className="pointer-events-none absolute left-0 right-0 z-20 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${hoveredTheme.p.accent}80, transparent)` }}
                    initial={{ top: "0%",   opacity: 1 }}
                    animate={{ top: "108%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE_EXPO, delay: 0.04 }}
                  />

                  {/* "PREVIEW" pill */}
                  <motion.div
                    className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1"
                    style={{ background: `${hoveredTheme.p.accent}1e`, backdropFilter: "blur(8px)", border: `1px solid ${hoveredTheme.p.accent}30` }}
                    initial={{ opacity: 0, scale: 0.75, y: -4 }}
                    animate={{ opacity: 1, scale: 1,    y: 0 }}
                    transition={{ delay: 0.15, duration: 0.22, ease: EASE_EXPO }}
                  >
                    <motion.div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: hoveredTheme.p.accent }}
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span style={{ color: hoveredTheme.p.accent, fontSize: 7, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      Preview
                    </span>
                  </motion.div>

                  <MiniMockup
                    p={hoveredTheme.p}
                    name={hoveredTheme.name}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Section label ─── */}
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1,  y: 0  }}
              transition={{ delay: 0.05, duration: 0.2, ease: EASE_EXPO }}
              className="text-textColor/30 px-2 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest"
            >
              Themes
            </motion.span>

            {/* ─── Theme list ─── */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onMouseLeave={scheduleHoverClear}
            >
              {themes.map((t) => {
                const isActive  = currentTheme === t.key;
                const isHovered = hoveredKey   === t.key;

                return (
                  <motion.button
                    key={t.key}
                    variants={rowVariants}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.965, x: 1 }}
                    onMouseEnter={() => { cancelHoverClear(); setHoveredKey(t.key); }}
                    onClick={() => handleThemeChange(t.key)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-150 ${
                      isActive  ? "bg-accentColor/10"     :
                      isHovered ? "bg-explorerBorder/20"  : ""
                    }`}
                    aria-label={`Apply ${t.name} theme`}
                  >
                    {/* Swatch — scales up on row hover */}
                    <motion.div
                      className={`h-6 w-6 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? "border-accentColor shadow-[0_0_8px_color-mix(in_srgb,var(--color-accentColor)_35%,transparent)]"
                          : "border-explorerBorder/50 group-hover:border-textColor/30"
                      }`}
                      animate={{ scale: isHovered ? 1.14 : 1, rotate: isHovered ? 8 : 0 }}
                      transition={{ ...SPRING_SNAPPY }}
                    >
                      <div className="flex h-full w-full">
                        {t.colors.map((color, ci) => (
                          <div key={ci} className="h-full w-1/3" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </motion.div>

                    {/* Name — nudges right on hover */}
                    <motion.span
                      className={`flex-1 whitespace-nowrap text-xs font-medium transition-colors duration-150 ${
                        isActive ? "text-accentColor" : "text-textColor/60 group-hover:text-textColor"
                      }`}
                      animate={{ x: isHovered ? 2 : 0 }}
                      transition={{ ...SPRING_SNAPPY }}
                    >
                      {t.name}
                    </motion.span>

                    {/* Active dot — layout-animated across rows on theme switch */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="theme-active-dot"
                          className="bg-accentColor h-1.5 w-1.5 shrink-0 rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{   scale: 0, opacity: 0 }}
                          transition={{ ...SPRING_SNAPPY }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeToggle;

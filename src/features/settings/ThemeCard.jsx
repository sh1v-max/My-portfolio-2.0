/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import ThemePreview from "./ThemePreview";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ThemeCard({ name, publisher, theme, description, palette, downloads }) {
  const { changeTheme, theme: currentTheme } = useTheme();
  const isActive = currentTheme === theme;
  const [applying, setApplying] = useState(false);

  const handleApply = (e) => {
    e.stopPropagation();
    if (isActive || applying) return;
    setApplying(true);
    // Brief delay for visual feedback
    setTimeout(() => {
      changeTheme(theme);
      setApplying(false);
    }, 400);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleApply}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
        isActive
          ? "border-accentColor/50 bg-accentColor/[0.03] shadow-[0_0_40px_rgba(136,192,208,0.1)]"
          : "border-explorerBorder/60 bg-articleBg/20 hover:border-accentColor/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      }`}
    >
      {/* Active glow bar at top */}
      {isActive && (
        <div className="absolute left-0 right-0 top-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-accentColor to-transparent" />
      )}

      {/* ─── Dynamic Theme Preview ─── */}
      <div className="relative overflow-hidden border-b border-explorerBorder/30 p-3 pb-2">
        <ThemePreview themeClass={`theme-${theme}`} />

        {/* Hover overlay with "Preview" text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-mainBg/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accentColor shadow-lg">
            {isActive ? "✓ Active" : "Click to Apply"}
          </span>
        </div>

        {/* Active badge */}
        {isActive && (
          <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-accentColor px-2.5 py-1 shadow-lg">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mainBg" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-mainBg">
              Active
            </span>
          </div>
        )}
      </div>

      {/* ─── Card Content ─── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title + Publisher */}
        <div className="mb-1.5">
          <h3 className="text-lg font-bold text-textColor transition-colors duration-200 group-hover:text-accentColor">
            {name}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-textColor/40">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {publisher}
          </p>
        </div>

        {/* Description */}
        <p className="mb-4 text-[11px] leading-relaxed text-textColor/45">
          {description}
        </p>

        {/* Palette + Meta Row */}
        <div className="mt-auto flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center">
            {palette?.map((color, i) => (
              <div
                key={i}
                className="relative -ml-1 h-[18px] w-[18px] rounded-full border-2 border-mainBg shadow-sm transition-all duration-200 first:ml-0 hover:z-10 hover:-translate-y-0.5 hover:scale-125"
                style={{
                  backgroundColor: color,
                  zIndex: palette.length - i,
                }}
                title={color}
              />
            ))}
          </div>

          {/* Downloads */}
          {downloads && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-textColor/25">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {downloads}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleApply}
          disabled={isActive || applying}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            isActive
              ? "cursor-default border border-accentColor/20 bg-accentColor/10 text-accentColor"
              : applying
                ? "cursor-wait bg-accentColor/20 text-accentColor"
                : "bg-accentColor/10 text-accentColor hover:bg-accentColor hover:text-mainBg active:scale-[0.97]"
          }`}
        >
          {applying ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block h-3 w-3 rounded-full border-2 border-accentColor/30 border-t-accentColor"
              />
              Applying...
            </>
          ) : isActive ? (
            "✓ Currently Applied"
          ) : (
            "Apply Theme"
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default ThemeCard;

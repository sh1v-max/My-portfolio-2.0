/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useTheme } from "../../context/ThemeContext";
import ThemePreview from "./ThemePreview";

function ThemeCard({
  name,
  publisher,
  theme,
  description,
  palette,
  downloads,
}) {
  const { changeTheme, theme: currentTheme } = useTheme();
  const isActive = currentTheme === theme;
  const [applying, setApplying] = useState(false);

  const handleApply = (e) => {
    e.stopPropagation();
    if (isActive || applying) return;
    setApplying(true);
    setTimeout(() => {
      changeTheme(theme);
      setApplying(false);
    }, 400);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleApply}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition duration-300 ${
        isActive
          ? "border-accentColor/50 bg-accentColor/3 shadow-[0_0_40px_rgba(136,192,208,0.1)]"
          : "border-explorerBorder/60 bg-articleBg/20 hover:border-accentColor/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      }`}
    >
      {/* Active glow bar at top */}
      {isActive && (
        <div className="via-accentColor absolute left-0 right-0 top-0 z-10 h-0.5 bg-linear-to-r from-transparent to-transparent" />
      )}

      {/* ─── Dynamic Theme Preview ─── */}
      <div className="border-explorerBorder/30 relative overflow-hidden border-b p-3 pb-2">
        <ThemePreview themeClass={`theme-${theme}`} />

        {/* Hover overlay with "Preview" text */}
        <div className="bg-mainBg/60 pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="border-accentColor/30 bg-accentColor/10 text-accentColor rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-lg">
            {isActive ? "✓ Active" : "Click to Apply"}
          </span>
        </div>

        {/* Active badge */}
        {isActive && (
          <div className="bg-accentColor absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 shadow-lg">
            <span className="bg-mainBg h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className="text-mainBg text-[10px] font-bold uppercase tracking-wider">
              Active
            </span>
          </div>
        )}
      </div>

      {/* ─── Card Content ─── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title + Publisher */}
        <div className="mb-1.5">
          <h3 className="text-textColor group-hover:text-accentColor text-lg font-bold transition-colors duration-200">
            {name}
          </h3>
          <p className="text-textColor/40 flex items-center gap-1.5 text-xs">
            <Icon icon="lucide:user" className="opacity-50" width="11" height="11" />
            {publisher}
          </p>
        </div>

        {/* Description */}
        <p className="text-textColor/45 mb-4 text-[11px] leading-relaxed">
          {description}
        </p>

        {/* Palette + Meta Row */}
        <div className="mt-auto flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center">
            {palette?.map((color, i) => (
              <div
                key={i}
                className="border-mainBg relative -ml-1 h-4.5 w-4.5 rounded-full border-2 shadow-sm transition-all duration-200 first:ml-0 hover:z-10 hover:-translate-y-0.5 hover:scale-125"
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
            <span className="text-textColor/25 flex items-center gap-1 text-[10px] font-medium">
              <Icon icon="lucide:download" width="11" height="11" />
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
              ? "border-accentColor/20 bg-accentColor/10 text-accentColor cursor-default border"
              : applying
              ? "bg-accentColor/20 text-accentColor cursor-wait"
              : "bg-accentColor/10 text-accentColor hover:bg-accentColor hover:text-mainBg active:scale-[0.97]"
          }`}
        >
          {applying ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="border-accentColor/30 border-t-accentColor inline-block h-3 w-3 rounded-full border-2"
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

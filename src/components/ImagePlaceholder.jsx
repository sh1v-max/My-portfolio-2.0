/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";

// Stands in wherever a card has no screenshot yet — the "Coming Soon" entries in
// the projects list and the build archive.
//
// This replaces two hardcoded placehold.co URLs. Those cost a live request to a
// third party on every page load, and baked in one theme's palette (#1f2428 on
// #88c0d0 — nord) so the placeholder clashed in the other five. Drawing it in
// the app instead makes it free, offline-safe, and theme-aware.
export default function ImagePlaceholder({
  label = "In progress",
  icon = "lucide:hammer",
  className = "",
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-articleBg ${className}`}
    >
      {/* Diagonal hatch — the visual shorthand for "not built yet". Drawn with a
          repeating gradient rather than an asset so it costs nothing and picks
          up the active accent. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--accentColor) 0 1px, transparent 1px 10px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2.5">
        <Icon
          icon={icon}
          aria-hidden="true"
          className="h-6 w-6 text-accentColor"
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-textMuted">
          {label}
        </span>
      </div>
    </div>
  );
}

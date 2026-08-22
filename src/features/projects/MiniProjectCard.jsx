/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icon } from "@iconify/react";

function getDisplayUrl(url) {
  try {
    return new URL(url).hostname
      .replace("www.", "")
      .replace(".netlify.app", "")
      .replace(".vercel.app", "")
      .replace(".web.app", "");
  } catch {
    return "demo";
  }
}

// `decorative` marks the duplicated cards a marquee needs for its seamless
// loop: still clickable by mouse, but out of the tab order so keyboard users
// don't traverse the same project twice.
//
// `gutter` puts the spacing between cards *inside* this hover target rather
// than as a margin outside it. In a moving marquee an outside margin is a
// dead zone: it slides under a stationary cursor, hover drops, and the card
// falls back down — which reads as flicker.
function MiniProjectCard({ title, description, image, tags, sourceCode, demo, decorative = false, gutter = 0 }) {
  const [hovered, setHovered] = useState(false);
  const linkTabIndex = decorative ? -1 : undefined;

  return (
    <div
      style={gutter ? { paddingRight: gutter } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/*
        Tailwind v4 applies `-translate-y-*` via the standalone `translate`
        property, not `transform` — so `translate` (not `transform`) is what
        has to be in the transition list or the lift snaps instantly.
      */}
      {/*
        The lift steps in whole pixels. At a fractional vertical offset the
        browser blends the hard chrome-bar/screenshot edge into an extra row
        of pixels, and animating through fractional values makes that row's
        brightness swing every frame — the thin flickering line. Stepping by
        1px keeps the sub-pixel phase constant, so that edge renders
        identically at every point of the animation. Six 1px steps over 350ms
        reads as smooth; border-color still fades continuously.
      */}
      <article
        style={{
          transition:
            "translate 350ms steps(6, end), border-color 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={`relative flex flex-col overflow-hidden rounded-xl border bg-articleBg ${
          hovered ? "-translate-y-1.5 border-accentColor/20" : "border-explorerBorder/30"
        }`}
      >
        {/* ── Browser chrome bar ── */}
        <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-explorerBorder/25 bg-mainBg px-3 sm:h-9 sm:px-3.5">
          <span
            className={`h-2 w-2 rounded-full transition-colors duration-200 sm:h-2.5 sm:w-2.5 ${
              hovered ? "bg-[#ff5f57]" : "bg-textColor/15"
            }`}
          />
          <span
            className={`h-2 w-2 rounded-full transition-colors duration-200 sm:h-2.5 sm:w-2.5 ${
              hovered ? "bg-[#ffbd2e]" : "bg-textColor/15"
            }`}
          />
          <span
            className={`h-2 w-2 rounded-full transition-colors duration-200 sm:h-2.5 sm:w-2.5 ${
              hovered ? "bg-[#27c93f]" : "bg-textColor/15"
            }`}
          />
          <div className="ml-2 flex min-w-0 flex-1 justify-center">
            <span className="truncate rounded bg-explorerBorder/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-textColor/30">
              {demo ? getDisplayUrl(demo) : title.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>
        </div>

        {/* ── Screenshot ── */}
        <div className="relative h-32 shrink-0 overflow-hidden sm:h-44">
          <img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            className={`h-full w-full object-cover object-top transition-transform duration-500 ease-out ${
              hovered ? "scale-[1.06]" : "scale-100"
            }`}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-transparent to-articleBg" />
        </div>

        {/* ── Content ── */}
        <div className="flex flex-1 flex-col gap-2 p-3 pt-2.5 sm:gap-2.5 sm:p-4 sm:pt-3">
          <div>
            <h3 className="mb-1.5 text-[13px] font-bold leading-snug tracking-tight text-textColor sm:mb-2 sm:text-[15px]">
              {title}
            </h3>
            <div
              className={`h-px w-full origin-left bg-accentColor/35 transition-transform duration-300 ease-out ${
                hovered ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-textColor/50">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-accentColor/15 bg-accentColor/5 px-2 py-0.5 font-mono text-[10px] text-accentColor/65"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="self-center text-[10px] text-textColor/25">
                +{tags.length - 3}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center gap-2 pt-1">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo`}
                tabIndex={linkTabIndex}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg bg-accentColor/10 text-xs font-semibold text-accentColor transition-colors duration-200 hover:bg-accentColor/20 focus-visible:outline-2 focus-visible:outline-accentColor sm:h-9"
              >
                <Icon icon="lucide:external-link" className="h-3 w-3" />
                Live Demo
              </a>
            )}
            {sourceCode && (
              <a
                href={sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source code`}
                tabIndex={linkTabIndex}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-explorerBorder/35 text-textColor/40 transition-colors duration-200 hover:border-accentColor/30 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor sm:h-9 sm:w-9"
              >
                <Icon icon="lucide:github" className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default MiniProjectCard;

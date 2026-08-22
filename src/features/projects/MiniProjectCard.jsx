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

function MiniProjectCard({ title, description, image, tags, sourceCode, demo }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/*
        Tailwind v4 applies `-translate-y-*` via the standalone `translate`
        property, not `transform` — so `translate` (not `transform`) is what
        has to be in the transition list or the lift snaps instantly.
      */}
      <article
        className={`relative flex flex-col overflow-hidden rounded-xl border bg-articleBg transition-[translate,border-color] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hovered ? "-translate-y-1.5 border-accentColor/20" : "border-explorerBorder/30"
        }`}
      >
        {/* ── Browser chrome bar ── */}
        <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-explorerBorder/25 bg-mainBg px-3.5">
          <span
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
              hovered ? "bg-[#ff5f57]" : "bg-textColor/15"
            }`}
          />
          <span
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
              hovered ? "bg-[#ffbd2e]" : "bg-textColor/15"
            }`}
          />
          <span
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
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
        <div className="relative h-44 shrink-0 overflow-hidden">
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
        <div className="flex flex-1 flex-col gap-2.5 p-4 pt-3">
          <div>
            <h3 className="mb-2 text-[15px] font-bold leading-snug tracking-tight text-textColor">
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
                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-accentColor/10 text-xs font-semibold text-accentColor transition-colors duration-200 hover:bg-accentColor/20 focus-visible:outline-2 focus-visible:outline-accentColor"
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-explorerBorder/35 text-textColor/40 transition-colors duration-200 hover:border-accentColor/30 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-accentColor"
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

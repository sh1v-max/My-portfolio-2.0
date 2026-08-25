/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import CalendarModule from "react-github-calendar";
import { personal } from "../../../data/config";
import { DUR_MICRO, EASE_OUT } from "../../../lib/motion";

const ActivityCalendar = CalendarModule.default || CalendarModule;

function formatTooltipDate(iso) {
  // Parsed as local, not UTC — `new Date("2026-08-12")` on its own reads as
  // midnight UTC, which prints the day *before* in any timezone west of it.
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function contributionLabel(count) {
  if (count === 0) return "No contributions";
  if (count === 1) return "1 contribution";
  return `${count} contributions`;
}

// Renders in two places now: the full /github dashboard, and the home page's
// GitHub section. `compact` drops the chrome the home section supplies itself
// (its own heading and lede) and the year tabs, which are a dashboard control
// rather than something a summary needs.
export default function ContributionGraph({ theme, compact = false, large = false, year: fixedYear, onTotalCount }) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(fixedYear ?? currentYear);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  // Fixed positioning means a hovered cell that scrolls out from under the
  // cursor (the calendar's own horizontal scrollbar on narrow screens) would
  // otherwise leave the tooltip stranded mid-air, pointing at nothing.
  useEffect(() => {
    if (!tooltip || !containerRef.current) return;
    const el = containerRef.current;
    const clear = () => setTooltip(null);
    el.addEventListener("scroll", clear, { passive: true });
    window.addEventListener("resize", clear);
    return () => {
      el.removeEventListener("scroll", clear);
      window.removeEventListener("resize", clear);
    };
  }, [tooltip]);

  const showTooltip = useCallback((event, activity) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip({
      activity,
      left: rect.left + rect.width / 2,
      top: rect.top,
    });
    event.target.style.cursor = "pointer";
    event.target.style.transition = "filter 0.15s ease-out";
    event.target.style.filter = "brightness(1.4)";
  }, []);

  const hideTooltip = useCallback((event) => {
    setTooltip(null);
    if (event?.target) event.target.style.filter = "";
  }, []);

  // Every day is a real, addressable moment — clicking one opens that exact
  // date on GitHub instead of the tooltip being the entire interaction.
  const openDay = useCallback((activity) => {
    window.open(
      `https://github.com/${personal.githubUsername}?tab=overview&from=${activity.date}&to=${activity.date}`,
      "_blank",
      "noopener,noreferrer",
    );
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // The reveal repaints every square in sequence. That is a large, moving
    // field of colour — exactly what prefers-reduced-motion exists to suppress —
    // so under that setting the calendar simply renders in its final state.
    // The total-count read below still runs regardless: it isn't motion.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let timeoutIds = [];
    let reportedTotal = null;

    const animateBlocks = () => {
      const rects = Array.from(containerRef.current.querySelectorAll("rect"));
      const dayRects = rects.filter(
        (r) => r.hasAttribute("data-level") || r.hasAttribute("data-date"),
      );
      if (dayRects.length === 0) return;

      // Prevent re-animating the same elements — mutating `fill` retriggers the
      // MutationObserver, which would otherwise loop forever.
      if (dayRects[0].dataset.animatedYear === year.toString()) return;

      // Empty-day colour comes from the palette in use rather than a literal,
      // so the wipe starts from the same shade the calendar actually renders.
      const emptyFill = theme?.dark?.[0] ?? "#161b22";

      dayRects.forEach((rect) => {
        rect.dataset.animatedYear = year.toString();
        rect.dataset.originalFill = rect.getAttribute("fill");
        rect.setAttribute("fill", emptyFill);
        rect.style.transition = "fill 0.4s ease-out";
      });

      dayRects.forEach((rect, i) => {
        timeoutIds.push(
          setTimeout(() => {
            rect.setAttribute("fill", rect.dataset.originalFill);
          }, i * 3),
        );
      });
    };

    // react-github-calendar computes its own total from the data it fetches
    // and renders it in a <footer> ("1,157 contributions in the last year").
    // That figure isn't exposed as a prop or via a ref, so reading the
    // rendered text is the only way to reuse the real number without a
    // second, duplicate fetch of the same contribution data.
    const reportTotal = () => {
      const footer = containerRef.current.querySelector("footer");
      if (!footer) return;

      // Only hidden when a caller actually wants the number itself (via
      // onTotalCount) to avoid showing it twice. The library's own footer
      // sets `display: flex` via an unlayered CSS module rule, which beats a
      // Tailwind utility (always `@layer utilities`) regardless of
      // specificity — a `hidden` class here is silently a no-op. Hiding it
      // directly is the only reliable way.
      if (compact && onTotalCount) footer.style.display = "none";

      if (!onTotalCount) return;
      const match = footer.textContent.match(/[\d,]+/);
      if (!match) return;
      const value = Number(match[0].replace(/,/g, ""));
      if (value !== reportedTotal) {
        reportedTotal = value;
        onTotalCount(value);
      }
    };

    const handleMutation = () => {
      if (!prefersReduced) animateBlocks();
      reportTotal();
    };

    const observer = new MutationObserver(handleMutation);
    observer.observe(containerRef.current, { childList: true, subtree: true, characterData: true });
    handleMutation();

    return () => {
      observer.disconnect();
      timeoutIds.forEach(clearTimeout);
    };
  }, [year, theme, onTotalCount, compact]);

  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  const calendar = (
    <div
      ref={containerRef}
      className="flex w-full justify-start overflow-x-auto pb-2 md:justify-center"
    >
      {/* The calendar is a colour field with no text alternative of its own. */}
      <div
        className="text-textColor min-w-max"
        role="img"
        aria-label={`GitHub contribution calendar for ${year}, showing daily commit activity for @${personal.githubUsername}`}
      >
        <ActivityCalendar
          username={personal.githubUsername}
          year={year}
          /* react-activity-calendar picks its palette from the OS
             prefers-color-scheme unless told otherwise, and only reads
             theme.dark when it resolves to dark. Every one of this site's six
             themes is dark, so on a light-mode machine the calendar was
             rendering its default LIGHT greyscale — near-white empty cells on a
             dark card — and ignoring the greens passed in entirely. Pinning the
             scheme makes the palette deterministic. */
          colorScheme="dark"
          fontSize={large ? 13 : compact ? 12 : 12}
          blockSize={large ? 15 : compact ? 14 : 12}
          blockMargin={large ? 5 : compact ? 5 : 4}
          theme={theme}
          hideColorLegend={compact}
          hideMonthLabels={false}
          eventHandlers={{
            onMouseEnter: (event) => (activity) => showTooltip(event, activity),
            onMouseLeave: (event) => () => hideTooltip(event),
            onClick: () => (activity) => openDay(activity),
          }}
        />
      </div>

      {/* Portalled to <body>: this calendar renders inside cards with
          `overflow-hidden` and inside a scroll-reveal `motion.div` that
          leaves a resting `transform` on itself even at rest — either one
          silently breaks `position: fixed` math (a transformed ancestor
          becomes the containing block instead of the viewport) or clips a
          tooltip popping out above the grid. A portal sidesteps both. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {tooltip && (
              <motion.div
                role="tooltip"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR_MICRO, ease: EASE_OUT }}
                // Sitting directly over the calendar's own coloured cells, a
                // flat `bg-mainBg` tooltip landed almost the same shade as the
                // card behind it and disappeared into the grid. Glass reads
                // correctly here precisely because there's real colour
                // underneath it to blur — unlike a card floating on a flat
                // page, this is the one spot on the whole calendar where
                // backdrop-blur actually does something.
                className="border-white/15 bg-white/10 pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg border px-3 py-2 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md"
                style={{ left: tooltip.left, top: tooltip.top }}
              >
                {contributionLabel(tooltip.activity.count)}
                <span className="ml-1.5 font-normal text-white/70">
                  on {formatTooltipDate(tooltip.activity.date)}
                </span>
                <span
                  aria-hidden="true"
                  className="border-white/15 bg-white/10 absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r backdrop-blur-md"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );

  if (compact) return calendar;

  return (
    <div className="border-explorerBorder bg-articleBg flex flex-col overflow-hidden rounded-2xl border p-5 shadow-sm md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-textColor text-3xl font-bold tracking-tight">
            GitHub Contributions
          </h2>
          <p className="text-textSecondary font-mono text-sm leading-relaxed">
            A visual snapshot of my coding activity — each square is a day of
            learning, building, and pushing code. Consistency over perfection.
          </p>
        </div>

        {/* Year tabs */}
        <div className="border-explorerBorder flex shrink-0 items-center gap-1 rounded-xl border p-1">
          {years.map((y) => {
            const active = year === y;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`min-h-11 rounded-lg px-3 text-xs font-bold tabular-nums transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accentColor ${
                  active
                    ? "bg-accentColor/15 text-accentColor shadow-sm"
                    : "text-textMuted hover:bg-explorerBorder/30 hover:text-textSecondary"
                }`}
                aria-pressed={active}
                aria-label={`Show ${y} contributions`}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>

      {calendar}
    </div>
  );
}

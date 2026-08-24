/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import CalendarModule from "react-github-calendar";
import { personal } from "../../../data/config";

const ActivityCalendar = CalendarModule.default || CalendarModule;

// Renders in two places now: the full /github dashboard, and the home page's
// GitHub section. `compact` drops the chrome the home section supplies itself
// (its own heading and lede) and the year tabs, which are a dashboard control
// rather than something a summary needs.
export default function ContributionGraph({ theme, compact = false, year: fixedYear }) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(fixedYear ?? currentYear);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // The reveal repaints every square in sequence. That is a large, moving
    // field of colour — exactly what prefers-reduced-motion exists to suppress —
    // so under that setting the calendar simply renders in its final state.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let timeoutIds = [];

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

    const observer = new MutationObserver(animateBlocks);
    observer.observe(containerRef.current, { childList: true, subtree: true });
    animateBlocks();

    return () => {
      observer.disconnect();
      timeoutIds.forEach(clearTimeout);
    };
  }, [year, theme]);

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
          fontSize={compact ? 11 : 12}
          blockSize={compact ? 11 : 12}
          blockMargin={compact ? 4 : 4}
          theme={theme}
          hideColorLegend={compact}
          hideMonthLabels={false}
        />
      </div>
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

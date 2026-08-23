import { useState, useEffect, useRef } from "react";
import CalendarModule from "react-github-calendar";

const ActivityCalendar = CalendarModule.default || CalendarModule;

// eslint-disable-next-line react/prop-types
export default function ContributionGraph({ theme }) {
  // Default to the current year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let timeoutIds = [];

    const animateBlocks = () => {
      // Find all rect elements inside the calendar
      const rects = Array.from(containerRef.current.querySelectorAll("rect"));

      // Filter out legend rects or non-day rects (they usually have data-level or data-date)
      const dayRects = rects.filter(
        (r) => r.hasAttribute("data-level") || r.hasAttribute("data-date"),
      );

      if (dayRects.length === 0) return;

      // Prevent re-animating if the exact same elements were already animated for this year
      // This stops infinite loops when we mutate the fill attribute
      const firstRect = dayRects[0];
      if (firstRect.dataset.animatedYear === year.toString()) {
        return;
      }

      // 1. Instantly blacken out all squares and save their true colors
      dayRects.forEach((rect) => {
        rect.dataset.animatedYear = year.toString();
        rect.dataset.originalFill = rect.getAttribute("fill");

        // #161b22 is a dark empty color typically used in GitHub dark mode
        rect.setAttribute("fill", "#161b22");
        rect.style.transition = "fill 0.4s ease-out";
      });

      // 2. Sequentially fill them up one by one after a tiny delay per block
      dayRects.forEach((rect, i) => {
        const tId = setTimeout(() => {
          rect.setAttribute("fill", rect.dataset.originalFill);
        }, i * 3); // 3ms delay between each block creates a fast, smooth wave

        timeoutIds.push(tId);
      });
    };

    // Use MutationObserver to catch when react-github-calendar finishes loading and renders the SVG
    const observer = new MutationObserver(() => {
      animateBlocks();
    });

    observer.observe(containerRef.current, { childList: true, subtree: true });

    // Also try immediately in case it rendered instantly from cache
    animateBlocks();

    return () => {
      observer.disconnect();
      timeoutIds.forEach(clearTimeout);
    };
  }, [year]);

  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  return (
    <div className="border-explorerBorder bg-articleBg flex flex-col overflow-hidden rounded-2xl border p-5 shadow-sm md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-textColor text-3xl font-bold tracking-tight">
            GitHub Contributions
          </h2>
          <p className="text-textSecondary font-mono text-sm leading-relaxed">
            A visual snapshot of my coding activity, each green square
            represents a day of learning, building, and pushing code.
            Consistency over perfection 💻
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
                className={`rounded-lg px-3 py-1.5 text-xs font-bold tabular-nums transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accentColor ${
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

      <div
        ref={containerRef}
        className="flex w-full justify-start overflow-x-auto pb-2 md:justify-center"
      >
        <div className="text-textColor min-w-max">
          <ActivityCalendar
            username="sh1v-max"
            year={year}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
            theme={theme}
            hideColorLegend={false}
            hideMonthLabels={false}
          />
        </div>
      </div>
    </div>
  );
}

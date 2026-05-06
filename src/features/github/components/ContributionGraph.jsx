import { useState, useEffect, useRef } from "react";
import CalendarModule from "react-github-calendar";
import { Icon } from "@iconify/react";

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

  return (
    <div className="border-explorerBorder bg-articleBg flex flex-col overflow-hidden rounded-2xl border p-5 shadow-sm md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-start">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            GitHub Contributions
          </h2>
          <p className="text-textColor/70 font-mono text-sm leading-relaxed">
            A visual snapshot of my coding activity, each green square
            represents a day of learning, building, and pushing code.
            Consistency over perfection 💻
          </p>
        </div>

        <div className="relative shrink-0">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border-accentColor/40 bg-articleBg focus:border-accentColor focus:ring-accentColor/20 cursor-pointer appearance-none rounded-xl border px-6 py-2.5 pr-10 text-sm font-bold text-white transition-all focus:outline-none focus:ring-2"
          >
            <option value={currentYear}>{currentYear}</option>
            <option value={currentYear - 1}>{currentYear - 1}</option>
            <option value={currentYear - 2}>{currentYear - 2}</option>
            <option value={currentYear - 3}>{currentYear - 3}</option>
          </select>
          <Icon
            icon="lucide:chevron-down"
            className="text-textColor/50 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            width="16"
          />
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

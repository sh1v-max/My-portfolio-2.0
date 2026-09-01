import { motion } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToId } from "../lib/lenis";

// The vertical counterpart to PageNavigator's dot row (`w-6` active / `w-1.5`
// inactive) so section-level and page-level orientation read as one system.
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "lab", label: "Archive" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function SectionRail() {
  const { activeSection } = useActiveSection();

  return (
    <nav aria-label="Section navigation" className="flex flex-col items-center gap-2.5">
      {SECTIONS.map(({ id, label }) => {
        const active = id === activeSection;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(id);
            }}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            className="group relative flex items-center justify-center rounded-full py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentColor"
          >
            <motion.span
              animate={{ height: active ? 24 : 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`w-1.5 rounded-full transition-colors duration-200 ${
                active ? "bg-accentColor" : "bg-textColor/15 group-hover:bg-textColor/30"
              }`}
            />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-explorerBorder bg-articleBg px-2.5 py-1 text-[11px] font-semibold tracking-wide text-textColor opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

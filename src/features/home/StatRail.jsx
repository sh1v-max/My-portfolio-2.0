import { motion } from "framer-motion";
import { stats } from "../../data/config";
import { projects } from "../projects/project";
import { realBuildCount } from "../frontend-lab/data/uiExperimentsData";

const shippedCount = projects.filter((p) => p.title !== "Coming Soon...").length;

// One line of proof under the socials — every figure traces to the same
// arrays the rest of the page renders, so it cannot drift out of sync.
const ITEMS = [
  `${shippedCount} projects`,
  `${realBuildCount} builds`,
  `${stats.themes} themes`,
  "MERN + AI",
];

export default function StatRail() {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.45, ease: "easeOut" }}
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 lg:justify-start"
    >
      {ITEMS.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden="true" className="text-textMuted/40 inline-block h-1 w-1 rounded-full bg-current" />}
          <span className="text-textSecondary text-[13px] font-semibold tracking-wide tabular-nums">
            {item}
          </span>
        </li>
      ))}
    </motion.ul>
  );
}

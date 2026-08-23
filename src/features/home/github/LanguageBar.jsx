/* eslint-disable react/prop-types */
import { motion, useReducedMotion } from "framer-motion";
import { DUR_ENTER, EASE_OUT, REVEAL_ONCE } from "../../../lib/motion";
import { getLanguageMix } from "./languageMix";

// Language mix, derived from the repo list already in the GitHub context.
//
// This counts **repositories per primary language**, not bytes of code. GitHub's
// own percentages are byte-weighted, which needs a /languages call per repo — N
// extra requests for a summary. The label says "by repository" so the chart
// never claims a precision it does not have.
//
// Each language gets a swatch AND a written label with its count: colour alone
// never carries the meaning.
const SWATCHES = [
  "bg-accentColor",
  "bg-accentColor/70",
  "bg-accentColor/45",
  "bg-accentColor/28",
  "bg-textColor/25",
];

export default function LanguageBar({ repos }) {
  const reduceMotion = useReducedMotion();
  const { rows, total } = getLanguageMix(repos);

  if (!total) {
    return (
      <p className="text-textMuted text-sm">
        No language data available for these repositories yet.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-textMuted text-[11px] font-bold uppercase tracking-[0.2em]">
          Languages
        </p>
        <p className="text-textMuted text-[11px]">
          by repository · {total} repos
        </p>
      </div>

      {/* The bar is decoration over the list below, which carries the same data
          as text. Hidden from assistive tech so it is not read twice. */}
      <div
        aria-hidden="true"
        className="flex h-2.5 w-full overflow-hidden rounded-full bg-textColor/10"
      >
        {rows.map((row, i) => (
          <motion.span
            key={row.name}
            className={`block h-full ${SWATCHES[i] ?? SWATCHES.at(-1)}`}
            /* Width is layout; the reveal rides on scaleX from the left edge.
               Animating width instead would reflow the whole row every frame. */
            style={{ width: `${(row.count / total) * 100}%`, originX: 0 }}
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={REVEAL_ONCE}
            transition={{ duration: DUR_ENTER, delay: i * 0.06, ease: EASE_OUT }}
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {rows.map((row, i) => (
          <li key={row.name} className="flex items-center gap-2 text-xs">
            <span
              aria-hidden="true"
              className={`h-2 w-2 shrink-0 rounded-full ${SWATCHES[i] ?? SWATCHES.at(-1)}`}
            />
            <span className="text-textSecondary font-medium">{row.name}</span>
            <span className="text-textMuted tabular-nums">
              {Math.round((row.count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

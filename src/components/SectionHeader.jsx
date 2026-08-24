/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { sectionHeader, sectionItem, REVEAL_ONCE } from "../lib/motion";

// The header every non-hero section wears, in one place.
//
// Five sections previously carried a byte-identical copy of this markup and its
// reveal variants, which is why all five ended up the same size: nothing made it
// easy to say "this section matters more". `size` does.
//
//   lg -> the page's centrepiece (Work)
//   md -> primary sections (About, Contact)
//   sm -> supporting evidence (Archive, GitHub)
const TITLE_SIZE = {
  lg: "text-4xl sm:text-5xl md:text-6xl",
  md: "text-4xl md:text-5xl",
  sm: "text-3xl md:text-4xl",
};

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  size = "md",
  href,
  cta,
  className = "",
}) {
  return (
    <motion.div
      variants={sectionHeader}
      initial="hidden"
      whileInView="show"
      viewport={{ ...REVEAL_ONCE, amount: 0.3 }}
      className={`flex flex-col items-start gap-3 ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={sectionItem}
          className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold uppercase tracking-widest"
        >
          <span aria-hidden="true" className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={sectionItem}
        className={`text-textColor font-bold tracking-tight text-balance ${TITLE_SIZE[size]}`}
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          variants={sectionItem}
          /* max-w-2xl keeps the measure inside 60-75 characters at every width */
          className="text-textSecondary max-w-2xl text-base leading-relaxed md:text-lg"
        >
          {lede}
        </motion.p>
      )}

      <motion.div
        variants={sectionItem}
        aria-hidden="true"
        className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
      />

      {href && cta && (
        <motion.div variants={sectionItem} className="mt-1">
          <Link
            to={href}
            className="group text-textColor hover:text-accentColor inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold transition-colors duration-200 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentColor"
          >
            {cta}
            <Icon
              icon="lucide:arrow-right"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { personal, githubSkills } from "../../data/config";

const hc = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const hi = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const STATS = [
  { icon: "lucide:git-branch", label: "Repositories", value: "62+" },
  { icon: "lucide:git-commit-horizontal", label: "Commits", value: "1K+" },
  { icon: "lucide:star", label: "Stars earned", value: "2+" },
  { icon: "lucide:users", label: "Followers", value: "23" },
];

export default function GithubTeaser() {
  return (
    <section className="py-16 md:py-24">

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* Section header */}
        <motion.div
          variants={hc}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col items-start gap-3"
        >
          <motion.span
            variants={hi}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
            Open Source
          </motion.span>
          <motion.h2
            variants={hi}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            GitHub Dashboard
          </motion.h2>
          <motion.p
            variants={hi}
            className="text-textColor/60 max-w-xl text-base leading-relaxed"
          >
            An overview of my open-source contributions, coding activity, and repositories
            — all pulled live from the GitHub API.
          </motion.p>
          <motion.div
            variants={hi}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* Content: stats + profile/skills */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

          {/* Stats — numbers are the hero here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 gap-4 lg:w-90 lg:shrink-0"
          >
            {STATS.map(({ icon, label, value }) => (
              <div
                key={label}
                className="border-explorerBorder bg-articleBg group flex flex-col gap-3 rounded-2xl border p-5 transition-[border-color] duration-300 hover:border-accentColor/25"
              >
                <Icon icon={icon} className="text-accentColor/50 h-4 w-4" />
                <span className="text-textColor text-4xl font-black leading-none tracking-tight">
                  {value}
                </span>
                <span className="text-textColor/40 text-xs font-medium uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Profile card + skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-1 flex-col gap-5"
          >
            {/* GitHub profile card — more visual weight */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-explorerBorder bg-articleBg hover:border-accentColor/30 flex items-center gap-4 rounded-2xl border p-5 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            >
              {/* Avatar with GitHub icon ring */}
              <div className="relative shrink-0">
                <div className="bg-accentColor/10 border-accentColor/20 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2">
                  <Icon icon="lucide:github" className="text-accentColor h-7 w-7" />
                </div>
                <div className="bg-accentColor absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full">
                  <Icon icon="lucide:check" className="text-mainBg h-3 w-3" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-textColor text-base font-bold leading-tight">
                  @{personal.githubUsername}
                </p>
                <p className="text-textColor/45 mt-0.5 text-xs leading-snug">
                  Full Stack JS Developer · Shipping projects daily
                </p>
              </div>
              <Icon
                icon="lucide:external-link"
                className="text-textColor/25 group-hover:text-accentColor h-4 w-4 shrink-0 transition-colors duration-300"
              />
            </a>

            {/* Contribution activity bar */}
            <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
              <p className="text-textColor/40 mb-3 text-xs font-semibold uppercase tracking-widest">
                Activity
              </p>
              <div className="flex items-end gap-1" aria-hidden="true">
                {[30, 55, 40, 70, 45, 80, 60, 90, 75, 50, 65, 85].map((h, i) => (
                  <div
                    key={i}
                    className="bg-accentColor/30 hover:bg-accentColor/60 flex-1 rounded-sm transition-colors duration-200"
                    style={{ height: `${h * 0.48}px` }}
                  />
                ))}
              </div>
              <p className="text-textColor/30 mt-2 text-xs">
                Consistent contributions — last 12 months
              </p>
            </div>

            {/* Core skills */}
            <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
              <p className="text-textColor/40 mb-3 text-xs font-semibold uppercase tracking-widest">
                Core stack
              </p>
              <div className="flex flex-wrap gap-2">
                {githubSkills.slice(0, 8).map((skill) => (
                  <span
                    key={skill}
                    className="border-accentColor/15 bg-accentColor/5 text-accentColor/75 rounded-full border px-3 py-1 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex justify-start"
        >
          <Link
            to="/github"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accentColor/40 bg-accentColor/10 px-6 py-3 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
          >
            View full dashboard
            <Icon
              icon="lucide:arrow-right"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

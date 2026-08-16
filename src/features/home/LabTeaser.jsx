import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { miniProjects } from "../projects/miniProjects";

const hc = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const hi = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const preview = miniProjects.slice(0, 3);

export default function LabTeaser() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-accentColor/5 blur-[72px]"
        aria-hidden="true"
      />
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
            Frontend Lab
          </motion.span>
          <motion.h2
            variants={hi}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            Mini Projects
          </motion.h2>
          <motion.p
            variants={hi}
            className="text-textColor/60 max-w-xl text-base leading-relaxed"
          >
            Focused UI experiments, machine-coding challenges, and creative builds —
            each one sharpening a specific skill.
          </motion.p>
          <motion.div
            variants={hi}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* Mini project cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MiniCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex justify-start"
        >
          <Link
            to="/frontend-lab"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accentColor/40 bg-accentColor/10 px-6 py-3 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
          >
            Explore the lab
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

function MiniCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg transition-[border-color,box-shadow] duration-300 hover:border-accentColor/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-articleBg to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-textColor text-base font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="text-textColor/55 line-clamp-2 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border-accentColor/15 bg-accentColor/5 text-accentColor/70 rounded-md border px-2 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accentColor hover:text-accentColor/70 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-colors hover:bg-accentColor/5"
            >
              <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-textColor/40 hover:text-accentColor inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors hover:bg-accentColor/5"
            >
              <Icon icon="lucide:github" className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

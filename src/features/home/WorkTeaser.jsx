import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { projects } from "../projects/project";

const hc = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const hi = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const featured = projects.filter((p) => p.title !== "Coming Soon...").slice(0, 3);

export default function WorkTeaser() {
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
            My Work
          </motion.span>
          <motion.h2
            variants={hi}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={hi}
            className="text-textColor/60 max-w-xl text-base leading-relaxed"
          >
            Production-grade applications built with real APIs, AI integrations,
            and polished interfaces — each one going further than tutorials.
          </motion.p>
          <motion.div
            variants={hi}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* Featured card — full width, hero treatment */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <FeaturedCard project={featured[0]} />
        </motion.div>

        {/* Supporting cards — 2-column */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.slice(1).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
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
            to="/projects"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accentColor/40 bg-accentColor/10 px-6 py-3 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
          >
            View all projects
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

function FeaturedCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group overflow-hidden rounded-2xl border border-accentColor/25 bg-articleBg shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accentColor)_12%,transparent)] transition-[box-shadow] duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_color-mix(in_srgb,var(--color-accentColor)_25%,transparent)]"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Screenshot — full height on desktop, 16:9 on mobile */}
        <div className="relative overflow-hidden lg:h-auto lg:w-[44%] lg:shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-56 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 lg:h-full"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-articleBg to-transparent" />
          {/* Featured badge */}
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accentColor/40 bg-accentColor/15 px-3 py-1 text-xs font-semibold text-accentColor backdrop-blur-sm">
              <Icon icon="lucide:star" className="h-3 w-3" />
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-4 p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-textColor text-2xl font-bold tracking-tight">
              {project.title}
            </h3>
            <p className="text-textColor/60 line-clamp-3 text-sm leading-relaxed lg:text-base">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="border-accentColor/15 bg-accentColor/5 text-accentColor/70 rounded-md border px-2.5 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.caseStudy && (
              <Link
                to={project.caseStudy}
                className="group/link inline-flex min-h-9 items-center gap-2 rounded-full border border-accentColor/40 bg-accentColor/10 px-4 py-2 text-xs font-bold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg"
              >
                <Icon icon="lucide:file-text" className="h-3.5 w-3.5" />
                Case Study
              </Link>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textColor/40 hover:text-accentColor inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors hover:bg-accentColor/5"
              >
                <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
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
          className="h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-articleBg to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-textColor text-lg font-bold tracking-tight">
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
          {project.caseStudy && (
            <Link
              to={project.caseStudy}
              className="text-accentColor hover:text-accentColor/70 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-colors hover:bg-accentColor/5"
            >
              <Icon icon="lucide:file-text" className="h-3.5 w-3.5" />
              Case Study
            </Link>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-textColor/40 hover:text-accentColor inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors hover:bg-accentColor/5"
            >
              <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

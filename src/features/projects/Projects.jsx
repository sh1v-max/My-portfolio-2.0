import ProjectCard from "./ProjectCard";
import MiniProjectsCarousel from "./MiniProjectsCarousel";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { projects } from "./project";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ─── Header Animation ────────────────────────────────────
const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Slower stagger for header elements
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function Projects() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Projects</title>
      </Helmet>

      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* ─── Animated Header ─── */}
          <motion.div
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-14 flex flex-col items-start gap-3"
          >
            {/* Accent tag */}
            <motion.span
              variants={headerItem}
              className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              Featured Work
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={headerItem}
              className="text-textColor text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              Projects
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={headerItem}
              className="text-textColor/60 max-w-xl text-base leading-relaxed"
            >
              A selection of projects I&apos;ve built — from AI-powered
              platforms to full-stack applications. Each one crafted with
              attention to detail, performance, and user experience.
            </motion.p>

            {/* Decorative accent line */}
            <motion.div
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-gradient-to-r"
            />
          </motion.div>

          {/* ─── True Scroll-triggered Grid ─── */}
          {/* We do NOT use parent stagger here. Each card tracks itself. */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} // Triggers when 10% is visible
                transition={{
                  duration: 1, // 1 second duration
                  delay: cols === 1 ? 0.15 : (i < cols ? 0.45 : 0.15) + (i % cols) * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <ProjectCard
                  title={p.title}
                  desc={p.description}
                  img={p.image}
                  srcCode={p.sourceCode}
                  demo={p.demo}
                  tags={p.tags}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Projects Carousel */}
      <MiniProjectsCarousel />
    </HelmetProvider>
  );
}

export default Projects;

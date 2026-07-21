import ProjectCard from "./ProjectCard";
import MiniProjectsCarousel from "./MiniProjectsCarousel";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { projects } from "./project";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PageNavigator from "../../components/PageNavigator";

// ─── Header Animation ────────────────────────────────────
const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function Projects() {
  const [cols, setCols] = useState(3);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

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

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          {/* ─── Animated Header ─── */}
          <motion.div
            variants={headerContainer}
            initial="hidden"
            animate="show"
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
              className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
            >
              Projects
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={headerItem}
              className="text-textColor/60 text-base leading-relaxed text-justify md:w-1/2"
            >
              A selection of projects I&apos;ve built, from AI-powered
              platforms to full-stack applications. Each one crafted with
              attention to detail, performance, and user experience.
            </motion.p>

            {/* Decorative accent line */}
            <motion.div
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
            />
          </motion.div>

          {/* ─── True Scroll-triggered Grid ─── */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 1,
                  delay: cols === 1 ? 0.3 : (!isLoaded && i < cols ? 0.45 : 0.15) + (i % cols) * 0.15,
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
                  caseStudy={p.caseStudy}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Projects Carousel */}
      <MiniProjectsCarousel />

      {/* Page Navigation */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <PageNavigator />
      </div>
    </HelmetProvider>
  );
}

export default Projects;

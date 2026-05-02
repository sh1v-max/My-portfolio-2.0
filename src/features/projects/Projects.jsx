import ProjectCard from "./ProjectCard";
import MiniProjectsCarousel from "./MiniProjectsCarousel";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { projects } from "./project";

function Projects() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Projects</title>
      </Helmet>

      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        {/* Section Header */}
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col items-start gap-3">
            {/* Accent tag */}
            <span className="inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor">
              <span className="h-1.5 w-1.5 rounded-full bg-accentColor animate-pulse" />
              Featured Work
            </span>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-textColor sm:text-5xl">
              Projects
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base leading-relaxed text-textColor/60">
              A selection of projects I&apos;ve built — from AI-powered platforms
              to full-stack applications. Each one crafted with attention to
              detail, performance, and user experience.
            </p>

            {/* Decorative accent line */}
            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-accentColor to-accentColor/30" />
          </div>

          {/* Project Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                desc={p.description}
                img={p.image}
                srcCode={p.sourceCode}
                demo={p.demo}
                tags={p.tags}
              />
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

/* eslint-disable react/prop-types */
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ProjectButton from "../../../components/ProjectButton";

export default function ExperimentCard({ project }) {
  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "border-green-500/30 bg-green-500/10 text-green-400";
      case "Intermediate":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
      case "Advanced":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      default:
        return "border-gray-500/30 bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accentColor/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
      {/* Top subtle glow line */}
      <div className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-accentColor to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-articleBg via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Level Badge overlaid on image */}
        <div className="absolute right-3 top-3 z-20">
          <span
            className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${getLevelColor(
              project.level
            )}`}
          >
            {project.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="mb-1 text-xs font-semibold text-accentColor">
          {project.category}
        </div>
        <h3 className="mb-2 text-lg font-bold text-textColor transition-colors duration-300 group-hover:text-accentColor">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-textColor/60">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-explorerBorder/50 px-2 py-0.5 text-xs text-textColor/70"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-3">
          <ProjectButton
            href={project.demo}
            icon={ExternalLink}
            variant="primary"
            className="flex-1"
          >
            Demo
          </ProjectButton>
          <ProjectButton
            href={project.sourceCode}
            icon={FaGithub}
            variant="outline"
            className="flex-1"
          >
            Code
          </ProjectButton>
        </div>
      </div>
    </article>
  );
}
